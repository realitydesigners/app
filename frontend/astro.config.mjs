import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from 'astro-sanity';
import { defineConfig, passthroughImageService } from 'astro/config';

// https://astro.build/config
export default defineConfig({
   integrations: [
      tailwind(),
      react(),
      sanity({
         projectId: 'fovvfda4',
         dataset: 'production',
      }),
   ],
   server: {
      port: 3000,
   },
   images: {
      domains: ['cdn.sanity.io'],
   },
   image: {
      service: passthroughImageService(),
   },
   plugins: ['prettier-plugin-astro'],
   prefetch: true,
});
