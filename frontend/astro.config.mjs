import { defineConfig } from "astro/config";
import sanity from "astro-sanity";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: "qnse80qk",
    dataset: "production",
    apiVersion: "v2021-03-25",
    useCdn: true
  }), tailwind()]
});