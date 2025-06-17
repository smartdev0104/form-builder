import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: {
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#E1E1E1',
          300: '#9DA4B2',
          400: '#677289',
          500: '#1A1A1A',
        },
        'slate-alpha': {
          15: '#9DA4B226',
          35: '#9DA4B259',
        }
      },
    },
  },
  plugins: [],
};
export default config;
