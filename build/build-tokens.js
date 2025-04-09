import StyleDictionary from "style-dictionary";

const valueWithUnit = (val) => {
  return typeof val === "number" ? `${val}px` : val;
};

// register it with register method
StyleDictionary.registerFormat({
  name: "css/variables-multi-context",
  format: ({ dictionary }) => {
    const root = [];
    const light = [];
    const dark = [];

    dictionary.allTokens.map((token) => {
      const name = `--${token.name}`;
      const val = token.value;
      if (
        typeof token.value === "object" &&
        (token.value.light || token.value.dark)
      ) {
        if (token.value.light) {
          light.push(`${name}: ${valueWithUnit(val.light)};`);
        }
        if (token.value.dark) {
          dark.push(`${name}: ${valueWithUnit(val.dark)};`);
        }
      } else {
        root.push(`${name}: ${valueWithUnit(val)};`);
      }
    });
    return `
    @import "tailwindcss";

    @theme {
        ${root.join("\n")}
    }
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
