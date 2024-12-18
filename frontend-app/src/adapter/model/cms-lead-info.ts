import {z} from "zod";

export const CmsLeadInfo =z.object( {
  data:z.object({
    email: z.string(),
    id: z.number(),
  })
})
