import StyleDictionary from "style-dictionary";
import { register } from "@tokens-studio/sd-transforms";
import { expandTypesMap } from "@tokens-studio/sd-transforms";

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

// StyleDictionary.registerTransform({
//   name: "size/px",
//   type: "value",
//   matcher: function (prop) {
//     // You can be more specific here if you only want 'em' units for font sizes
//     return prop.attributes.category === "rem";
//   },
//   transformer: function (prop) {
//     // You can also modify the value here if you want to convert pixels to ems
//     return parseFloat(prop.original.value) + "px";
//   },
// });

const sdGlobal = new StyleDictionary({
  // source: ['./tokens/**/*.json'],
  source: ["./tokens/**/token_global.json"],
  preprocessors: ["tokens-studio"],
  expand: {
    typesMap: expandTypesMap,
  },
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
      buildPath: "build/",
      files: [
        {
          destination: "global.variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});

await sdGlobal.cleanAllPlatforms();
await sdGlobal.buildAllPlatforms();

const sdDark = new StyleDictionary({
  // source: ['./tokens/**/*.json'],
  source: ["./tokens/**/token_dark.json"],
  preprocessors: ["tokens-studio"],
  expand: {
    typesMap: expandTypesMap,
  },
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
      buildPath: "build/",
      files: [
        {
          destination: "dark.variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});

await sdDark.cleanAllPlatforms();
await sdDark.buildAllPlatforms();

const sdDigitalFont = new StyleDictionary({
  // source: ['./tokens/**/*.json'],
  source: ["./tokens/**/token_digitalFont.json"],
  preprocessors: ["tokens-studio"],
  expand: {
    typesMap: expandTypesMap,
  },
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
      buildPath: "build/",
      files: [
        {
          destination: "digitalFont.variables.css",
          format: "css/variables",
        },
      ],
    },
  },
});

await sdDigitalFont.cleanAllPlatforms();
await sdDigitalFont.buildAllPlatforms();

console.log("build works!");
