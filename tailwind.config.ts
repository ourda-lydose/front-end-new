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
        'adpro-000': '#f5f5f5',
        'adpro-100': '#dddddd',
        'adpro-200': '#c4c4c4',
        'adpro-300': '#acacac',
        'adpro-400': '#939393',
        'adpro-500': '#7b7b7b',
        'adpro-600': '#626262',
        'adpro-700': '#494949',
        'adpro-800': '#313131',
        'adpro-900': '#181818',

        'adpro-pink-000': '#ff93e1',
        'adpro-pink-100': '#ff7dda',
        'adpro-pink-200': '#ff67d4',
        'adpro-pink-300': '#ff51ce',
        'adpro-pink-400': '#ff3cc8',
        'adpro-pink-500': '#ff26c2',
        'adpro-pink-600': '#e622af',
        'adpro-pink-700': '#cc1e9b',
        'adpro-pink-800': '#b31b88',
        'adpro-pink-900': '#991774',

        'adpro-dolly-000': '#e0bec0',
        'adpro-dolly-100': '#dab0b3',
        'adpro-dolly-200': '#d4a3a6',
        'adpro-dolly-300': '#cd9699',
        'adpro-dolly-400': '#c7898d',
        'adpro-dolly-500': '#c17c80',
        'adpro-dolly-600': '#ae7073',
        'adpro-dolly-700': '#9a6366',
        'adpro-dolly-800': '#87575a',
        'adpro-dolly-900': '#744a4d',

        'danger-500': '#E60000',

      },
    },
  },
  plugins: [],
};
export default config;
