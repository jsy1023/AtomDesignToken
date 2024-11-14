/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      base: {
        black: {
          50: "#5A5A5A",
          100: "#555555",
          200: "#4A4A4A",
          300: "#444444",
          400: "#3A3A3A",
          500: "#333333",
          600: "#2A2A2A",
          700: "#222222",
          800: "#1A1A1A",
          900: "#111111"
        },
        gray: {
          50: "#BBBBBB",
          100: "#B3B3B3",
          200: "#9E9E9E",
          300: "#999999",
          400: "#8E8E8E",
          500: "#888888",
          600: "#7E7E7E",
          700: "#777777",
          800: "#6E6E6E",
          900: "#666666"
        },
        white: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#F0F0F0",
          300: "#EBEBEB",
          400: "#E6E6E6",
          500: "#E0E0E0",
          600: "#DBDBDB",
          700: "#D6D6D6",
          800: "#D1D1D1",
          900: "#CCCCCC"
        },
        blue: {
          50: "#F6F8FD",
          100: "#CCD7F5",
          200: "#A1B6ED",
          300: "#7795E4",
          400: "#4C73DC",
          500: "#2855CC",
          600: "#2044A2",
          700: "#183277",
          800: "#0F204D",
          900: "#070E22"
        },
        green: {
          50: "#F7FDF7",
          100: "#CEF3CE",
          200: "#A5E8A5",
          300: "#7DDE7D",
          400: "#54D454",
          500: "#31C331",
          600: "#279B27",
          700: "#1D721D",
          800: "#124912",
          900: "#08210A"
        },
        red: {
          50: "#FDF7F7",
          100: "#F6DADA",
          200: "#EDB0B0",
          300: "#E48787",
          400: "#DA5D5D",
          500: "#D13434",
          600: "#AF2828",
          700: "#891F1F",
          800: "#641717",
          900: "#3E0E0E"
        }
      },
      brand: {
        primary: "#2855CC",
        secondary: "#0F204D"
      },
      system: {
        success: "#31C331",
        danger: "#D13434",
        info: "#333333"
      },
      fill: {
        wrapper: "#F0F0F0",
        card: "#FAFAFA",
        info: "#E6E6E6",
        border: "#CCCCCC"
      },
      text: {
        standard: "#333333",
        sub: "#666666",
        reverse: "#F0F0F0",
        subReverse: "#E0E0E0"
      },
      input: {
        text: {
          value: "#333333",
          type: "color",
          filePath: "tokens/token.json",
          isSource: true
        },
        background: {
          standard: "#F5F5F5"
        },
        border: {
          standard: "#CCCCCC"
        }
      },
      button: {
        text: "#FAFAFA",
        primary: {
          standard: {
            background: "#2855CC"
          }
        },
        secondary: {
          standard: {
            background: "#0F204D"
          }
        },
        success: {
          standard: {
            background: "#31C331"
          }
        },
        danger: {
          standard: {
            background: "#D13434"
          }
        },
        info: {
          standard: {
            background: "#333333"
          }
        }
      },
      card: {
        background: "#FAFAFA",
        border: "#CCCCCC",
        shadow: {
          x: "2",
          y: "2",
          blur: "8",
          spread: "0",
          color: "rgba(0,0,0,0.16)",
          type: "dropShadow"
        }
      },
      icon: {
        xs: "16",
        sm: "24",
        md: "32",
        lg: "48",
        xl: "80"
      },
      element: {
        xxs: "160",
        xs: "240",
        sm: "320",
        md: "480",
        lg: "640",
        xl: "960",
    "2xl": "1280",
    "3xl": "1920",
    "4xl": "2560",
    "5xl": "3840"
      },
      spacingNogap: "0",
      spacingXs: "4",
      spacingSm: "8",
      spacingMd: "16",
      spacingLg: "24",
      spacingXl: "48",
  "spacing_2xl": "120",
  "spacing_3xl": "240",
  "spacing_4xl": "320",
      mainTitle: "Spoqa Han Sans Neo",
      thin: "100",
      extraLight: "200",
      light: "300",
      normal: "400",
      bold: "700",
      medium: "500",
      semiBold: "600",
      extraBold: "800",
      black: "900",
      desktop: {
    "h1": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "48",
          lineHeight: "64"
        },
    "h2": {
          fontsize: "40",
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          lineHeight: "50"
        },
    "h3": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "32",
          lineHeight: "48"
        },
    "h4": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "24",
          lineHeight: "36"
        },
    "h5": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "20",
          lineHeight: "30"
        },
    "h6": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "18",
          lineHeight: "24"
        },
        bodyBase: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontsize: "16",
          lineHeight: "24"
        },
        bodyLg: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontsize: "18",
          lineHeight: "24"
        },
        bodySm: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontSize: "14",
          lineHeight: "20"
        },
        small: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontsize: "12",
          lineHeight: "18"
        },
        smallExtra: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontsize: "10",
          lineHeight: "16"
        }
      },
      mobile: {
    "h1": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "32",
          lineHeight: "48"
        },
    "h2": {
          fontSize: "28",
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          lineHeight: "40"
        },
    "h3": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "24",
          lineHeight: "32"
        },
    "h4": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "20",
          lineHeight: "28"
        },
    "h5": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "18",
          lineHeight: "24"
        },
    "h6": {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "700",
          fontsize: "16",
          lineHeight: "24"
        },
        bodyLg: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontsize: "16",
          lineHeight: "24"
        },
        bodyBase: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontSize: "14",
          lineHeight: "20"
        },
        bodySm: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontSize: "12",
          lineHeight: "18"
        },
        small: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontSize: "10",
          lineHeight: "16"
        },
        smallExtra: {
          fontFamily: "Spoqa Han Sans Neo",
          fontWeight: "400",
          fontSize: "8",
          lineHeight: "14"
        }
      },
      roundedCommon: "4",
      roundedNone: "0",
      roundedXs: "4",
      roundedSm: "8",
      roundedMd: "16",
      roundedLg: "24",
      roundedFull: "1000",
      shadowNone: {
        x: "0",
        y: "0",
        blur: "0",
        spread: "0",
        color: "#000000",
        type: "dropShadow"
      },
      shadowXs: {
        x: "2",
        y: "2",
        blur: "8",
        spread: "0",
        color: "rgba(0,0,0,0.16)",
        type: "dropShadow"
      },
      shadowSm: {
        x: "4",
        y: "4",
        blur: "16",
        spread: "0",
        color: "rgba(0,0,0,0.16)",
        type: "dropShadow"
      },
      shadowMd: {
        x: "8",
        y: "8",
        blur: "32",
        spread: "0",
        color: "rgba(0,0,0,0.16)",
        type: "dropShadow"
      },
      shadowLg: {
        x: "16",
        y: "16",
        blur: "64",
        spread: "0",
        color: "rgba(0,0,0,0.16)",
        type: "dropShadow"
      },
      shadowXl: {
        x: "24",
        y: "24",
        blur: "120",
        spread: "0",
        color: "rgba(0,0,0,0.16)",
        type: "dropShadow"
      },
      visible: "1",
  "opacity_80": "0.8",
  "opacity_90": "0.9",
  "opacity_70": "0.7",
  "opacity_60": "0.6",
  "opacity_50": "0.5",
  "opacity_40": "0.4",
  "opacity_30": "0.3",
  "opacity_20": "0.2",
  "opacity_10": "0.1",
      invisible: "0"
    },
  },
}