import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://globaltechsignal.com',
  //site: 'http://localhost:4321',
  integrations: [tailwind(), sitemap()],
  adapter: netlify(),
});