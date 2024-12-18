import {getLandingPage, getStrapiAdapterConfig} from "@/adapter/service/strapi-adapter"
import {LandingPageInformation} from "@/domain/model/landing-page-information"
import {TitleSection} from "@/components/title-section"
import {FormSection} from "@/components/form-section";
import {Description} from "@/components/description";
import {HeroImage} from "@/components/hero-image";

interface Props {
  params: {
    id: string
  }
}

export default async function LandingPage(props: Props) {
  const {id} = props.params
  const strapiAdapterConfig = getStrapiAdapterConfig()

  let landingPageInformation: LandingPageInformation | undefined
  try {
    landingPageInformation = await getLandingPage(id,strapiAdapterConfig)
  } catch (e) {
    console.log(e)
  }
  return (
    <>
      {landingPageInformation &&
          <div>
              <TitleSection title={landingPageInformation.title}/>
              <HeroImage
                  src={landingPageInformation.imageUrl}
                  alt="landig-page-image"
                  width={428}
                  height={314}
              />
              <Description>
                {landingPageInformation.description}
              </Description>
              <FormSection strapiConfig={strapiAdapterConfig}/>
          </div>
      }
    </>);
}
