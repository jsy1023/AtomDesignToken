import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { expandTypesMap } from '@tokens-studio/sd-transforms';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

const sdGlobal = new StyleDictionary({
    // source: ['./tokens/**/*.json'], 
    source: ['./tokens/**/token_global.json'], 
    preprocessors: ['tokens-studio'], 
    expand: {
        typesMap: expandTypesMap,
    },
    platforms: {
        scss: {
            transformGroup: 'css',
            transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
            buildPath: 'build/',
            files: [{
              destination: 'global.variables.css',
              format: 'css/variables'
            }]
          }
    },
});

await sdGlobal.cleanAllPlatforms();
await sdGlobal.buildAllPlatforms();

const sdDark = new StyleDictionary({
  // source: ['./tokens/**/*.json'], 
  source: ['./tokens/**/token_dark.json'], 
  preprocessors: ['tokens-studio'], 
  expand: {
      typesMap: expandTypesMap,
  },
  platforms: {
      scss: {
          transformGroup: 'css',
          transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
          buildPath: 'build/',
          files: [{
            destination: 'dark.variables.css',
            format: 'css/variables'
          }]
        }
  },
});

await sdDark.cleanAllPlatforms();
await sdDark.buildAllPlatforms();

const sdDigitalFont = new StyleDictionary({
  // source: ['./tokens/**/*.json'], 
  source: ['./tokens/**/token_digitalFont.json'], 
  preprocessors: ['tokens-studio'], 
  expand: {
      typesMap: expandTypesMap,
  },
  platforms: {
      scss: {
          transformGroup: 'css',
          transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
          buildPath: 'build/',
          files: [{
            destination: 'digitalFont.variables.css',
            format: 'css/variables'
          }]
        }
  },
});

await sdDigitalFont.cleanAllPlatforms();
await sdDigitalFont.buildAllPlatforms();

console.log('build works!');