import { defineConfig } from 'vitest/config'
import {resolve} from "node:path";

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
})
