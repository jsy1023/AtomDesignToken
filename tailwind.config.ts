import type { Config } from "tailwindcss";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // class 기반 다크모드
  theme: {
    
    extend: {
      // ...darkTheme.theme!.extend,
      // ...digitalFontTheme.theme!.extend,
    },
  },
  plugins: [],
} satisfies Config;
