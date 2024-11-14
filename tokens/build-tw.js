import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import { expandTypesMap } from '@tokens-studio/sd-transforms';
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

// const sd = new StyleDictionary({
//     source: ['./tokens/*.json'], 
//     preprocessors: ['tokens-studio'], 
//     expand: {
//         typesMap: expandTypesMap,
//     },
//     platforms: {
//         scss: {
//             transformGroup: 'scss',
//             transforms: ["ts/size/px", "ts/opacity", "name/kebab"],
//             buildPath: 'build/',
//             files: [{
//               destination: 'variables.scss',
//               format: 'scss/variables'
//             }]
//           }
//     }
// });

// await sd.cleanAllPlatforms();
// await sd.buildAllPlatforms();

const styleDictionaryTailwind = new StyleDictionary(
    makeSdTailwindConfig({ 
        type: 'all', 
        source: ['./tokens/**/*.json'], 
        buildPath: 'build/' }),
);
await styleDictionaryTailwind.hasInitialized;
await styleDictionaryTailwind.buildAllPlatforms();



console.log('build works!');