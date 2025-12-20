import type { Preview } from "@storybook/react";
import React from 'react';
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global Theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'finance'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;

      React.useEffect(() => {
        document.body.className = theme;
      }, [theme]);

      return React.createElement(Story);
    },
  ],
};

export default preview;
