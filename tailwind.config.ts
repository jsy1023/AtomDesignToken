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
        primary: "var(--brand-primary)",
        fillWrapper: "var(--fill-wrapper)",
        fillCard: "var(--fill-card)",
        fillBoarder: "var(--fill-border)",
        textStandard: "var(--text-standard)",
        textSub: "var(--text-sub)",
        textReverse: "var(--text-reverse)",
        textSubReverse: "var(--text-sub-reverse)",
        inputBackgroundStandard: "var(--input-background-standard)",
        inputBorderStandard: "var(--input-border-standard)",
      },
      fontSize: {
        // Desktop
        h1: [
          "var(--desktop-h1-font-size)",
          {
            lineHeight: "calc(var(--desktop-h1-line-height) * 1px)",
            fontWeight: "var(--desktop-h1-font-weight)",
          },
        ],
        h2: [
          "var(--desktop-h2-font-size)",
          {
            lineHeight: "calc(var(--desktop-h2-line-height) * 1px)",
            fontWeight: "var(--desktop-h2-font-weight)",
          },
        ],
        h3: [
          "var(--desktop-h3-font-size)",
          {
            lineHeight: "calc(var(--desktop-h3-line-height) * 1px)",
            fontWeight: "var(--desktop-h3-font-weight)",
          },
        ],
        h4: [
          "var(--desktop-h4-font-size)",
          {
            lineHeight: "calc(var(--desktop-h4-line-height) * 1px)",
            fontWeight: "var(--desktop-h4-font-weight)",
          },
        ],
        h5: [
          "var(--desktop-h5-font-size)",
          {
            lineHeight: "calc(var(--desktop-h5-line-height) * 1px)",
            fontWeight: "var(--desktop-h5-font-weight)",
          },
        ],
        h6: [
          "var(--desktop-h6-font-size)",
          {
            lineHeight: "calc(var(--desktop-h6-line-height) * 1px)",
            fontWeight: "var(--desktop-h6-font-weight)",
          },
        ],

        // Mobile
        mobileH1: [
          "var(--mobile-h1-font-size)",
          {
            lineHeight: "calc(var(--mobile-h1-line-height) * 1px)",
            fontWeight: "var(--mobile-h1-font-weight)",
          },
        ],
        mobileH2: [
          "var(--mobile-h2-font-size)",
          {
            lineHeight: "calc(var(--mobile-h2-line-height) * 1px)",
            fontWeight: "var(--mobile-h2-font-weight)",
          },
        ],
        mobileH3: [
          "var(--mobile-h3-font-size)",
          {
            lineHeight: "calc(var(--mobile-h3-line-height) * 1px)",
            fontWeight: "var(--mobile-h3-font-weight)",
          },
        ],
        mobileH4: [
          "var(--mobile-h4-font-size)",
          {
            lineHeight: "calc(var(--mobile-h4-line-height) * 1px)",
            fontWeight: "var(--mobile-h4-font-weight)",
          },
        ],
        mobileH5: [
          "var(--mobile-h5-font-size)",
          {
            lineHeight: "calc(var(--mobile-h5-line-height) * 1px)",
            fontWeight: "var(--mobile-h5-font-weight)",
          },
        ],
        mobileH6: [
          "var(--mobile-h6-font-size)",
          {
            lineHeight: "calc(var(--mobile-h6-line-height) * 1px)",
            fontWeight: "var(--mobile-h6-font-weight)",
          },
        ],
      },
      borderRadius: {
        common: "var(--rounded-common)",
        none: "var(--rounded-none)",
        xs: "var(--rounded-xs)",
        sm: "var(--rounded-sm)",
        md: "var(--rounded-md)",
        lg: "var(--rounded-lg)",
        full: "var(--rounded-full)",
      },
      fontFamily: {
        main: ["var(--main-title)"],
        body: ["var(--desktop-body-base-font-family)"],
      },
    },
  },
} satisfies Config;
