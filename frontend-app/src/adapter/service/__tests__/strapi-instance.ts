
import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'
import {cmsLandingPageInfo, emailInfo} from "@/adapter/service/__tests__/fixtures-strapi"


export function setupServerToReturnCmsLandingPageInfo() {
  server.use(
    http.get(`http://localhost:1337/api/pages`, () => {
      return HttpResponse.json(cmsLandingPageInfo, { status: 200 })
    }),
  )
}
export function setupServerToReturnBadRequestWhenGettingLandingPageInfo() {
  server.use(
    http.get(`http://localhost:1337/api/pages`, () => {
      return HttpResponse.json({ error: 'error' }, { status: 400 })
    }),
  )
}

export function setupServerToReturnInvalidPayloadWhenGettingLandingPageInfo() {
  server.use(
    http.get(`http://localhost:1337/api/pages`, () => {
      return HttpResponse.json({}, { status: 200 })
    }),
  )
}
export function setupServerToReturnLeadUploaded() {
  server.use(
    http.post(`http://localhost:1337/api/leads`, () => {
      return HttpResponse.json(emailInfo, { status: 200 })
    }),
  )
}
export function setupServerToReturnBadRequestWhenUploadingLead() {
  server.use(
    http.post(`http://localhost:1337/api/leads`, () => {
      return HttpResponse.json({ error: 'error' }, { status: 400 })
    }),
  )
}

export function setupServerToReturnInvalidPayloadWhenUploadingLead() {
  server.use(
    http.post(`http://localhost:1337/api/leads`, () => {
      return HttpResponse.json({}, { status: 200 })
    }),
  )
}

export const server = setupServer()