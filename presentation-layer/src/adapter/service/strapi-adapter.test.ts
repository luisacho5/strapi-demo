import {  afterAll, afterEach, beforeAll,expect, test } from 'vitest'
import {
  server,
  setupServerToReturnBadRequest,
  setupServerToReturnCmsLandingPageInfo, setupServerToReturnInvalidPayload
} from "@/adapter/service/__tests__/strapi-instance";
import {StrapiAdapter} from "@/adapter/service/strapi-adapter";
import {StrapiError} from "@/adapter/error/strapi-error";
import {InvalidPayload} from "@/adapter/error/invalid-payload";
import {LandingPageNotFound} from "@/adapter/error/landing-page-not-found";



  test("given an id should be able to get information from strapi and map it to a LandingPageInfo", async () => {
    setupServerToReturnCmsLandingPageInfo()
    const strapiAdapter = new StrapiAdapter({
      strapiURL: 'http://localhost:1337',
      strapiToken: 'token'
    })

    const result = await strapiAdapter.getLandingPage('1')

    expect(result.title).toBe('Another Landing Page')
    expect(result.description).toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    expect(result.imageUrl).toBe('http://localhost:1337/uploads/Screenshot_2024_12_17_at_16_14_42_5a8267e36d.png')
    expect(result).toBeDefined()
  })

test('Given a id, when strapi API returns a response NOT 2xx, then an error is thrown', async () => {
  setupServerToReturnBadRequest()
  const strapiAdapter = new StrapiAdapter({
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  })

  expect(strapiAdapter.getLandingPage('1')).rejects.toThrow(StrapiError)
})

test('Given a id, when strapi API returns a NOT valid response payload, then an error is thrown', async () => {
  setupServerToReturnInvalidPayload()
  const strapiAdapter = new StrapiAdapter({
    strapiURL: 'http://localhost:1337',
    strapiToken: 'token'
  })

  expect(strapiAdapter.getLandingPage('1')).rejects.toThrow(InvalidPayload)
})

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  })
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())