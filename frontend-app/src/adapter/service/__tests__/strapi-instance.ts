
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import {cmsLandingPageInfo} from "@/adapter/service/__tests__/fixtures-strapi"


export function setupServerToReturnCmsLandingPageInfo() {
  server.use(
    http.get(`http://localhost:1337/api/pages`, () => {
      return HttpResponse.json(cmsLandingPageInfo, { status: 200 })
    }),
  )
}
export function setupServerToReturnBadRequest() {
  server.use(
    http.get(`http://localhost:1337/api/pages`, () => {
      return HttpResponse.json({ error: 'error' }, { status: 400 })
    }),
  )
}

export function setupServerToReturnInvalidPayload() {
  server.use(
    http.get(`http://localhost:1337/api/pages`, () => {
      return HttpResponse.json({}, { status: 200 })
    }),
  )
}
export const server = setupServer()