import Image from "next/image";
import {getStrapiAdapterConfig, StrapiAdapter} from "@/adapter/service/strapi-adapter";
import {LandingPageInformation} from "@/domain/model/landing-page-information";
import styled from "styled-components";
import {TitleSection} from "@/components/TitleSection";

interface Props {
  params: {
    id: string
  }
}



export default async function LandingPage(props: Props) {
  const strapiAdapter = new StrapiAdapter(getStrapiAdapterConfig())
  const {id} = props.params
  let landingPageInformation: LandingPageInformation | undefined
  try {
    landingPageInformation = await strapiAdapter.getLandingPage(id)
  } catch (e) {
    console.log(e)
  }
  return (
    <>
      {landingPageInformation &&
          <div>
              <TitleSection title={landingPageInformation.title}>
              </TitleSection>
              <Image
                  src={landingPageInformation.imageUrl}
                  alt="landig-page-image"
                  width={428}
                  height={314}
                  priority
              />
              <p>
                {landingPageInformation.description}
              </p>
          </div>
      }
    </>);
}
