import { defineConfig } from "cypress";
import { configDotenv } from "dotenv";

configDotenv();

export default defineConfig({
  env: { ...process.env },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    testIsolation: false,
    watchForFileChanges: false,
    video: true,
    videoCompression: 32,
    viewportHeight: 1080,
    viewportWidth: 1920,
    //mobile portview
    // viewportHeight: 896,
    // viewportWidth: 414,
    supportFile: "cypress/support/e2e.ts",
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {},
  },
  video: true,
  videoCompression: 32,
  trashAssetsBeforeRuns: false,
});
