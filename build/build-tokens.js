import StyleDictionary from "style-dictionary";

// register it with register method
StyleDictionary.registerFormat({
  name: "css/variables-multi-context",
  format: ({ dictionary }) => {
    const root = [];
    const light = [];
    const dark = [];

    dictionary.allTokens.map((token) => {
      const name = `--${token.name}`;
      if (
        typeof token.value === "object" &&
        (token.value.light || token.value.dark)
      ) {
        if (token.value.light) {
          light.push(`${name}: ${token.value.light};`);
        }
        if (token.value.dark) {
          dark.push(`${name}: ${token.value.dark};`);
        }
      } else {
        root.push(`${name}: ${token.value};`);
      }
    });
    return `
    @import "tailwindcss";

    :root{
        ${root.join("\n")}
    }
    .light {
        ${light.join("\n")}
    }
    .dark {
        ${dark.join("\n")}
    }`.trim();
  },
});

const sd = new StyleDictionary({
  source: ["token.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "app/",
      files: [
        {
          destination: "globals.css",
          format: "css/variables-multi-context",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
