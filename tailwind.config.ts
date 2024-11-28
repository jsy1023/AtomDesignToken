import type { Config } from "tailwindcss";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  plugins: [],
  theme: {  
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        fillWrapper:'var(--fill-wrapper)',
        fillCard:'var(--fill-card)',
        textStandard:'var(--text-standard)'
      },
      fontSize: {
        // Desktop
        h1: ['calc(var(--desktop-h1-fontsize) * 1px)', {
          lineHeight: 'calc(var(--desktop-h1-line-height) * 1px)',
          fontWeight: 'var(--desktop-h1-font-weight)',
        }],
        h2: ['calc(var(--desktop-h2-fontsize) * 1px)', {
          lineHeight: 'calc(var(--desktop-h2-line-height) * 1px)',
          fontWeight: 'var(--desktop-h2-font-weight)',
        }],
        
        // Mobile
        mobileH1: ['calc(var(--mobile-h1-fontsize) * 1px)', {
          lineHeight: 'calc(var(--mobile-h1-line-height) * 1px)',
          fontWeight: 'var(--mobile-h1-font-weight)',
        }],
        mobileH2: ['calc(var(--mobile-h2-fontsize) * 1px)', {
          lineHeight: 'calc(var(--mobile-h2-line-height) * 1px)',
          fontWeight: 'var(--mobile-h2-font-weight)',
        }],
        
      },
      fontFamily: {
        'main': ['var(--main-title)'],
        'body': ['var(--desktop-body-base-font-family)'],
      },
    },
  },
} satisfies Config;
