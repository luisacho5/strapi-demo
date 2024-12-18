import {LandingPageInformation} from "@/domain/model/landing-page-information";


export interface ContentManagementService{
  getLandingPage(id: string): Promise<LandingPageInformation>;
}