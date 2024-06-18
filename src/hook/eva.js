import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';

export const eva = {
  mapping: mapping,
  themes: {
    light: {
      ...lightTheme,
      // Define your custom theme properties here if needed
    },
  },
  icons: EvaIconsPack,
  // Add the 'theme' property with the appropriate theme object
  theme: {
    ...lightTheme,
    // Define your custom theme properties here if needed
  },
};