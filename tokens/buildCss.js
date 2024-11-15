import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { expandTypesMap } from '@tokens-studio/sd-transforms';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

// async function buildThemeTokens() {
//   try {
//     // Global 테마 빌드
//     const globalTailwind = new StyleDictionary(
//       makeSdTailwindConfig({ 
//         type: 'all', 
//         source: ['./tokens/**/token_global.json'], 
//         buildPath: 'build/global/',
//         files: [
//           {
//             destination: 'tailwind.global.js',
//             format: 'javascript/module'
//           }
//         ]
//       })
//     );
//     await globalTailwind.hasInitialized;
//     await globalTailwind.buildAllPlatforms();
//     console.log('✓ Global theme built');

//     // Dark 테마 빌드
//     const darkTailwind = new StyleDictionary(
//       makeSdTailwindConfig({ 
//         type: 'all', 
//         source: ['./tokens/**/token_dark.json'], 
//         buildPath: 'build/dark/',
//         files: [
//           {
//             destination: 'tailwind.dark.js',
//             format: 'javascript/module'
//           }
//         ]
//       })
//     );
//     await darkTailwind.hasInitialized;
//     await darkTailwind.buildAllPlatforms();
//     console.log('✓ Dark theme built');

//     // Digital Font 테마 빌드
//     const digitalFontTailwind = new StyleDictionary(
//       makeSdTailwindConfig({ 
//         type: 'all', 
//         source: ['./tokens/**/token_digitalFont.json'], 
//         buildPath: 'build/digitalFont/',
//         files: [
//           {
//             destination: 'tailwind.digitalFont.js',
//             format: 'javascript/module'
//           }
//         ]
//       })
//     );
//     await digitalFontTailwind.hasInitialized;
//     await digitalFontTailwind.buildAllPlatforms();
//     console.log('✓ Digital Font theme built');

//     console.log('✓ All themes built successfully!');
//   } catch (error) {
//     console.error('Build failed:', error);
//     process.exit(1);
//   }
// }

// buildThemeTokens();

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



// const types = ['global', 'dark', 'digitalFont'];

// for (const type of types) {
//   let tailwindConfig = makeSdTailwindConfig({
//       type,
//       source: ['./tokens/token.json'], 
//    })

//    const styleDictionaryTailwind = new StyleDictionary(tailwindConfig);

//    await styleDictionaryTailwind.hasInitialized;
//    await styleDictionaryTailwind.buildAllPlatforms();
// }
    

// const globalTailwind = new StyleDictionary(
//     makeSdTailwindConfig({ 
//         type: 'all', 
//         source: ['./tokens/**/token_global.json'], 
//         buildPath: 'build/global/' }),
// );

// await globalTailwind.hasInitialized;
// await globalTailwind.buildAllPlatforms();

// const darkTailwind = new StyleDictionary(
//   makeSdTailwindConfig({ 
//       type: 'all', 
//       source: ['./tokens/**/token_dark.json'], 
//       buildPath: 'build/dark/' }),
// );

// await darkTailwind.hasInitialized;
// await darkTailwind.buildAllPlatforms();

// const digitalFontTailwind = new StyleDictionary(
//   makeSdTailwindConfig({ 
//       type: 'all', 
//       source: ['./tokens/**/token_digitalFont.json'], 
//       buildPath: 'build/digitalFont/' }),
// );

// await digitalFontTailwind.hasInitialized;
// await digitalFontTailwind.buildAllPlatforms();



console.log('build works!');