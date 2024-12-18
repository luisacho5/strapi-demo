import {LandingPageInformation} from "@/domain/model/landing-page-information";
import {LeadInformation} from "@/domain/model/lead-information";

export interface ContentManagementService{
  getLandingPage(id: string): Promise<LandingPageInformation>
  uploadLead(email:string):Promise<LeadInformation>
}