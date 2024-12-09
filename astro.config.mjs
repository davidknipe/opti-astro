// @ts-check
import htmx from "astro-htmx";
import { defineConfig } from "astro/config";
import mkcert from "vite-plugin-mkcert";

import node from "@astrojs/node";

import alpinejs from "@astrojs/alpinejs";
import tailwind from "@astrojs/tailwind"; // https://astro.build/config

import pageInsight from "astro-page-insight";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cms.optimizely.com",
      },
    ],
  },

  output: "server",

  adapter: netlify(),

  server: { port: 4321 },
  vite: {
    ssr: {
      noExternal: ["graphql", "graphql-request"],
    },
    plugins: [mkcert()],
  },
  integrations: [tailwind(), alpinejs(), htmx(), pageInsight()],
});