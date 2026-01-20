
import StyleDictionary from "style-dictionary";

// 2. Initialize Style Dictionary Instance
const myStyleDictionary = new StyleDictionary({
  source: ["tokens/tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "_variables.css",
          format: "myCustomFormat",
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});



// Outputs variables into CSS classes based on token sets.
https://styledictionary.com/versions/v4/migration/#formatting-options
myStyleDictionary.registerFormat({
  name: "myCustomFormat",
  format: function ({ dictionary, options }) {
    const getName = (token) =>
      [token.attributes.type, token.attributes.item, token.attributes.subitem].filter(Boolean).join("-");

    // Create a map for quick reference lookup by path
    const tokenMap = new Map(dictionary.allTokens.map((t) => [t.path.join("."), t]));

    const grouped = dictionary.allTokens.reduce((acc, token) => {
      const category = token.attributes.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(token);
      return acc;
    }, {});

    console.log(JSON.stringify(grouped, null, 2));

    return Object.entries(grouped)
      .map(([category, tokens]) => {
        const selector = category === "global" ? "@theme" : `.${category}`;
        return `${selector} {
${tokens
  .map((token) => {
    const name = getName(token);
    let value = token.$value || token.value;
    const originalValue = token.original.$value || token.original.value;

    if (options?.outputReferences && typeof originalValue === "string" && originalValue.includes("{")) {
       value = originalValue.replace(/{([^}]+)}/g, (match, pathStr) => {
         const refToken = tokenMap.get(pathStr);
         if (refToken) {
           return `var(--${getName(refToken)})`;
         }
         return match;
       });
    }

    return `  --${name}: ${value};`;
  })
  .join("\n")}
}`;
      })
      .join("\n\n");
  },
        });

myStyleDictionary.buildAllPlatforms();