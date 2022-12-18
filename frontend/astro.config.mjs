import { defineConfig } from 'astro/config';

// https://astro.build/config
import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity()]
});