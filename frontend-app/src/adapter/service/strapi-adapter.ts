import {ContentManagementService} from "@/domain/service/content-management-service";
import {LandingPageInformation} from "@/domain/model/landing-page-information";
import {CmsLandingPagesInfo} from "@/adapter/model/cms-landing-page-info";
import {z} from "zod";
import {StrapiError} from "@/adapter/error/strapi-error";
import {InvalidPayload} from "@/adapter/error/invalid-payload";
import {LandingPageNotFound} from "@/adapter/error/landing-page-not-found";
import {LeadInformation} from "@/domain/model/lead-information";
import {CmsLeadInfo} from "@/adapter/model/cms-lead-info";

export type CmsLeadInfo = z.infer<typeof CmsLeadInfo>
export type CmsLandingPagesInfo = z.infer<typeof CmsLandingPagesInfo>
export type StrapiAdapterConfig = {
  strapiURL: string
  strapiToken: string
}

export const getStrapiAdapterConfig = (): StrapiAdapterConfig => {
  if (!process.env.STRAPI_BASE_URL) throw new Error('Presentation-layer-application, Reading env secret, Missing STRAPI_BASE_URL')
  if (!process.env.TOKEN_API_STRAPI) throw new Error('Presentation-layer-application, Reading env secret, Missing TOKEN_API_STRAPI')
  return {
    strapiURL: process.env.STRAPI_BASE_URL,
    strapiToken: process.env.TOKEN_API_STRAPI,
  }
}

export class StrapiAdapter implements ContentManagementService {

  readonly #strapiURL: string
  readonly #strapiToken: string

  constructor(config: StrapiAdapterConfig) {
    this.#strapiURL = config.strapiURL
    this.#strapiToken = config.strapiToken
  }

  async uploadLead(email: string): Promise<LeadInformation> {
    const leadInfoCreated = await this.postLeadInfo(email)
    return new LeadInformation(leadInfoCreated.data.id,leadInfoCreated.data.email)
  }

  async getLandingPage(id: string): Promise<LandingPageInformation> {
    const pages = await this.fetchLandingPages(id)
    const pagesMapped = pages.data.map(page=>
      new LandingPageInformation(page.title,page.description, this.#strapiURL+page.image.url)
    )
    if (pagesMapped.length > 0) {
      return pagesMapped[0]
    }else{
      throw new LandingPageNotFound('no landing pages found')
    }
  }

  private async fetchLandingPages(id: string): Promise<CmsLandingPagesInfo> {
    const response = await fetch(`${this.#strapiURL}/api/pages?filters[id][$eq]=${id}&populate=*`, {
      headers: {
        Authorization: 'Bearer ' + this.#strapiToken,
      },
    })

    if (!response.ok) {
      throw new StrapiError(`error while retrieving landing page info for id: ${id}, response with status code: ${response.status}, error: ${response.text()}`)
    }

    try {
      const parsedResponse = await response.json()
      return CmsLandingPagesInfo.parse(parsedResponse)
    } catch (error) {
      throw new InvalidPayload(
        `landing page parsing failed while fetching from Strapi for id: ${id}, check logged Zod errors object, ${error}`,
      )
    }
  }

  private async postLeadInfo(email:string): Promise<CmsLeadInfo> {
    const response = await fetch('http://localhost:1337/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.#strapiToken,
      },
      body: JSON.stringify({
        data: {
          email: email
        }
      }),
    })
    if (!response.ok) {
      throw new StrapiError(`error while adding email : ${email}, response with status code: ${response.status}, error: ${response.text()}`)
    }
    try {
      const parsedResponse = await response.json()
      return CmsLeadInfo.parse(parsedResponse)
    } catch (error) {
      throw new InvalidPayload(
        `lead info parsing failed while creating from Strapi for email: ${email}, check logged Zod errors object, ${error}`,
      )
    }
  }

}