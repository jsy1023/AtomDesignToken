import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { Renderer } from "storybook/internal/types";
import { themes } from "@storybook/theming";

const preview: Preview = {
  decorators: [
    withThemeByClassName<Renderer>({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disabled: true },
    docs: themes.dark,
  },
};

export default preview;
