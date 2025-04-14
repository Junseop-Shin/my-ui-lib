import type { Meta, StoryObj } from "@storybook/react";
import DropdownStoryWrapper from "../common/DropdownStoryWrapper";

const meta = {
  title: "Example/Dropdown",
  component: DropdownStoryWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    triggerType: {
      control: { type: "select" },
      options: ["input", "button"],
    },
    searchable: { control: { type: "boolean" } },
  },
} satisfies Meta<typeof DropdownStoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonDropdown: Story = {
  args: {
    triggerType: "button",
    placeholder: "ButtonDropdown",
    options: [
      { label: "사과", value: "apple" },
      { label: "바나나", value: "banana" },
      { label: "오렌지", value: "orange" },
    ],
  },
};

export const Secondary: Story = {
  args: {
    triggerType: "input",
    placeholder: "InputDropdown",
    options: [
      { label: "사과", value: "apple" },
      { label: "바나나", value: "banana" },
      { label: "오렌지", value: "orange" },
    ],
  },
};
