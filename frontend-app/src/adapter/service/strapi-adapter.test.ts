import {afterAll, afterEach, beforeAll, expect, test} from 'vitest'
import {
  server,
  setupServerToReturnBadRequestWhenGettingLandingPageInfo,
  setupServerToReturnBadRequestWhenUploadingLead,
  setupServerToReturnCmsLandingPageInfo,
  setupServerToReturnInvalidPayloadWhenGettingLandingPageInfo,
  setupServerToReturnInvalidPayloadWhenUploadingLead,
  setupServerToReturnLeadUploaded
} from "@/adapter/service/__tests__/strapi-instance";
import {StrapiError} from "@/adapter/error/strapi-error";
import {InvalidPayload} from "@/adapter/error/invalid-payload";
import {getLandingPage, uploadLead} from "@/adapter/service/strapi-adapter";


test("given an id should be able to get information from strapi and map it to a LandingPageInfo", async () => {
  setupServerToReturnCmsLandingPageInfo()
  const strapiAdapterConfig = {
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  }

  const result = await getLandingPage('1',strapiAdapterConfig)

  expect(result.title).toBe('Another Landing Page')
  expect(result.description).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
  expect(result.imageUrl).toBe('http://localhost:1337/uploads/Screenshot_2024_12_17_at_16_14_42_5a8267e36d.png')
  expect(result).toBeDefined()
})

test('Given an id, when strapi API returns a response NOT 2xx, then an error is thrown', async () => {
  setupServerToReturnBadRequestWhenGettingLandingPageInfo()
  const strapiAdapterConfig = {
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  }

  await expect(getLandingPage('1',strapiAdapterConfig)).rejects.toThrow(StrapiError)
})

test('Given an id, when strapi API returns a NOT valid response payload, then an error is thrown', async () => {
  setupServerToReturnInvalidPayloadWhenGettingLandingPageInfo()
  const strapiAdapterConfig = {
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  }

  await expect(getLandingPage('1',strapiAdapterConfig)).rejects.toThrow(InvalidPayload)
})

test("Given a lead, should be able to upload it to strapi API and map it to LeadInformation", async () => {
  setupServerToReturnLeadUploaded()
  const strapiAdapterConfig = {
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  }

  const result = await uploadLead('test2@gmail.com',strapiAdapterConfig)

  expect(result).toBeDefined()
  expect(result.id).toBe(4)
  expect(result.email).toBe('test2@gmail.com')
})

test('Given a lead, when uploading it to strapi API returns a response NOT 2xx, then an error is thrown', async () => {
  setupServerToReturnBadRequestWhenUploadingLead()
  const strapiAdapterConfig = {
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  }

  await expect(uploadLead('test2@gmail.com',strapiAdapterConfig)).rejects.toThrow(StrapiError)
})

test('Given a lead, when uploading it to strapi API returns a NOT valid response payload, then an error is thrown', async () => {
  setupServerToReturnInvalidPayloadWhenUploadingLead()
  const strapiAdapterConfig = {
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  }

  await expect(uploadLead('test2@gmail.com',strapiAdapterConfig)).rejects.toThrow(InvalidPayload)
})


beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  })
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())