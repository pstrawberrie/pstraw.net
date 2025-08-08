// @ts-check
import "dotenv/config";
import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import Site from "./_slurpi/db/Site.js";

const siteData = await Site.findByPk(1);

export default defineConfig({
  integrations: [
    svelte(),
    sitemap(),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "dark-plus" },
    }),
  ],
  site: process.env.PUBLIC_SITE_URL,
  base: "/",
  trailingSlash: "never",
  vite: {
    define: {
      _SITE_DATA: siteData,
    },
  },
});
