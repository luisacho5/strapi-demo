import { z } from 'zod'

export const CmsLandingPageInfo =z.object( {
  title: z.string(),
  description: z.string(),
  image:z.object({
    url: z.string(),
  })
})

export const CmsLandingPagesInfo = z.object({
  data: z.array(CmsLandingPageInfo)
})