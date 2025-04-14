import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../common/Dropdown";

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
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonDropdown: Story = {
  args: {
    triggerType: "button",
    placeholder: "ButtonDropdown",
    multiSelect: false,
    options: [
      { label: "사과", value: "apple", description: "빨가면 사과" },
      { label: "바나나", value: "banana", description: "맛있으면 바나나" },
      { label: "오렌지", value: "orange" },
    ],
  },
};

export const MultiSelectInputDropdown: Story = {
  args: {
    triggerType: "input",
    placeholder: "InputDropdown",
    multiSelect: true,
    options: [
      { label: "사과", value: "apple", description: "빨가면 사과" },
      { label: "바나나", value: "banana", description: "맛있으면 바나나" },
      { label: "오렌지", value: "orange" },
    ],
  },
};

export const InputDropdown: Story = {
  args: {
    triggerType: "input",
    placeholder: "InputDropdown",
    multiSelect: false,
    options: [
      { label: "사과", value: "apple", description: "빨가면 사과" },
      { label: "바나나", value: "banana", description: "맛있으면 바나나" },
      { label: "오렌지", value: "orange" },
    ],
  },
};
