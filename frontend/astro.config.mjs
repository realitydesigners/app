import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    sanity({
      projectId: "fovvfda4",
      dataset: "production",
    }),
  ],
  images: {
    domains: ["cdn.sanity.io"],
  },
  image: {
   service: passthroughImageService(),
 },
  plugins: ["prettier-plugin-astro"],
});
