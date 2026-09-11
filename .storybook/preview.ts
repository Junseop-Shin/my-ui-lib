import type { Preview } from "@storybook/react-vite";
import React from "react";
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
    designTheme: {
      description: "디자인 테마",
      defaultValue: "default",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["default", "finance", "vintage-paper", "mocha-mousse", "neo-brutalism", "claymorphism"],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: "컬러 모드",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { designTheme, colorMode } = context.globals;

      React.useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", designTheme);
        root.setAttribute("data-mode", colorMode);
        // 기존 단일 축 클래스가 남아 있으면 지운다
        root.classList.remove("light", "dark", "finance");
        document.body.className = "";
      }, [designTheme, colorMode]);

      return React.createElement(Story);
    },
  ],
};

export default preview;
