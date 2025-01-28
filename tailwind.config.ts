import { Download } from "lucide-react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--PRIMARY)",
        primaryhover: "var(--PRIMARY-HOVER-NAV)",
        download: "var(--DOWNLOAD)",
        downloadhover: "var(--DOWNLOAD-HOVER)",

      },
    },
  },
  plugins: [],
} satisfies Config;
