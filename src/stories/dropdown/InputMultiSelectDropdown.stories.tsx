import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Meta } from "@storybook/react";
import { Dropdown } from "../../common/Dropdown";
import { DropdownStory } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Example/Dropdown/InputMultiSelectDropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

export const MultiSelectInputDropdown: DropdownStory = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 드롭다운 열기
    const input = canvas.getByPlaceholderText("InputDropdown");
    await userEvent.click(input);
    const menu = await canvas.findByTestId("dropdown-menu");
    const toggleButton = canvas.getByTestId("dropdown-toggle-button");
    expect(menu).toBeInTheDocument();

    // 2. 옵션 선택
    const clearAll = await canvas.findByText("전체 선택 해제");
    expect(clearAll).toBeInTheDocument();

    const option1 = await canvas.findByText("사과");
    await userEvent.click(option1);
    expect(option1).toHaveClass("bg-gray-200");
    expect(option1).toHaveTextContent("✔");
    expect(menu).toBeInTheDocument(); // not close

    const option2 = await canvas.findByText("바나나");
    await userEvent.click(option2);
    expect(option2).toHaveClass("bg-gray-200");

    const option3 = await canvas.findByText("오렌지");
    await userEvent.click(option3);
    expect(option3).toHaveClass("bg-gray-200");
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(input).toHaveValue("사과, 바나나, 오렌지"); // 드롭다운 닫힘
    });

    // 3. 옵션 선택 해제
    await userEvent.click(toggleButton);
    await userEvent.click(option1);
    expect(option1).not.toHaveClass("bg-gray-200");
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(input).toHaveValue("바나나, 오렌지");
    });

    // 4. 전체 선택 해제
    await userEvent.click(toggleButton);
    await userEvent.click(clearAll);
    expect(option1).not.toHaveClass("bg-gray-200");
    expect(option2).not.toHaveClass("bg-gray-200");
    expect(option3).not.toHaveClass("bg-gray-200");
    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  },
};
