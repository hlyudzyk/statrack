import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        'lightbase': '#398ded',
        'lightbase-hover': '#89BEF4',
        'footer':'#F7F7F7',
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
} satisfies Config;
