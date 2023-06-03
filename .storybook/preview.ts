import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { initialize, mswLoader } from 'msw-storybook-addon';
import docJson from '../documentation.json';
setCompodocJson(docJson);

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'pink',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'pink', value: '#c14583' },
      ],
    },
  },
  loaders: [mswLoader],
};

export default preview;
