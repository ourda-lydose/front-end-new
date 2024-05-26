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

        'adpro-blue-000': '#c3e7f5',
        'adpro-blue-100': '#b7e2f3',
        'adpro-blue-200': '#abddf1',
        'adpro-blue-300': '#9fd8ef',
        'adpro-blue-400': '#93d3ed',
        'adpro-blue-500': '#87ceeb',
        'adpro-blue-600': '#7ab9d4',
        'adpro-blue-700': '#6ca5bc',
        'adpro-blue-800': '#5f90a5',
        'adpro-blue-900': '#517c8d',

        'adpro-green-000': '#9ee1a7',
        'adpro-green-100': '#8bda95',
        'adpro-green-200': '#77d483',
        'adpro-green-300': '#64ce71',
        'adpro-green-400': '#50c860',
        'adpro-green-500': '#3dc24e',
        'adpro-green-600': '#37af46',
        'adpro-green-700': '#319b3e',
        'adpro-green-800': '#2b8837',
        'adpro-green-900': '#25742f',


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
