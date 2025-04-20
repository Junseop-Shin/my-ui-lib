import { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../../common/Dropdown";

const meta = {
  title: "Example/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    triggerType: {
      control: { type: "select" },
      options: ["input", "button"],
    },
    menuPosition: {
      control: { type: "select" },
      options: ["bottom-left", "bottom-right", "top-left", "top-right"],
    },
    searchable: { control: { type: "boolean" } },
    multiSelect: { control: { type: "boolean" } },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
export type DropdownStory = StoryObj<typeof meta>;
