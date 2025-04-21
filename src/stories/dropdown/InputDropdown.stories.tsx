import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Meta } from "@storybook/react";
import { Dropdown } from "../../common/Dropdown";
import { DropdownStory } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Example/Dropdown/InputDropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// input type dropdown default interaction test
export const InputDropdown: DropdownStory = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 드롭다운 열기
    const input = canvas.getByPlaceholderText("InputDropdown");
    await userEvent.click(input);

    // 2. 옵션 선택
    const option = await canvas.findByText("사과");
    await userEvent.click(option);

    // 3. 선택된 값 검증
    await waitFor(() => {
      expect(input).toHaveValue("사과");
    });

    // 3-1. 다른 옵션 선택 시 한개만 선택되는지 확인(not multiSelect)
    const option2 = await canvas.findByText("바나나");
    await userEvent.click(option2);
    await waitFor(() => {
      expect(input).toHaveValue("바나나");
      expect(input).not.toHaveValue("사과");
    });

    // 4. 검색 기능 기본 테스트
    await userEvent.type(input, "바");
    await waitFor(() => {
      const searchResult1 = canvas.queryByText("바나나");
      const searchResult2 = canvas.queryByText("사과");
      const searchResult3 = canvas.queryByText("오렌지");
      expect(searchResult1).toBeInTheDocument();
      expect(searchResult2).not.toBeInTheDocument();
      expect(searchResult3).not.toBeInTheDocument();
    });

    // 5. 검색 기능 테스트 no result
    await userEvent.type(input, "바");
    await waitFor(() => {
      const noResult = canvas.queryByText("No results");
      const searchResult1 = canvas.queryByText("바나나");
      const searchResult2 = canvas.queryByText("사과");
      const searchResult3 = canvas.queryByText("오렌지");
      expect(noResult).toBeInTheDocument();
      expect(searchResult1).not.toBeInTheDocument();
      expect(searchResult2).not.toBeInTheDocument();
      expect(searchResult3).not.toBeInTheDocument();
    });
  },
};

// keyboard event test
export const InputDropdownKeyboardEvent: DropdownStory = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 드롭다운 열기
    const input = canvas.getByPlaceholderText("InputDropdown");
    await userEvent.click(input);
    expect(input).toHaveFocus();
    let menu = await canvas.findByTestId("dropdown-menu");
    expect(menu).toBeInTheDocument();

    // 2. 키보드 이벤트 ArrowDown, ArrowUp, Escape
    const option1 = await canvas.findByText("사과");
    const option2 = await canvas.findByText("바나나");
    await userEvent.keyboard("{arrowdown}");
    expect(option1).toHaveClass("bg-gray-100");
    expect(option2).not.toHaveClass("bg-gray-100");
    await userEvent.keyboard("{arrowdown}");
    expect(option1).not.toHaveClass("bg-gray-100");
    expect(option2).toHaveClass("bg-gray-100");
    await userEvent.keyboard("{arrowup}");
    expect(option1).toHaveClass("bg-gray-100");
    expect(option2).not.toHaveClass("bg-gray-100");
    await userEvent.keyboard("{arrowup}");
    expect(option1).toHaveClass("bg-gray-100");
    expect(option2).not.toHaveClass("bg-gray-100");
    await userEvent.keyboard("{escape}");
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });

    // 3. 키보드 이벤트 Enter
    expect(input).toHaveFocus();
    await userEvent.keyboard("{enter}");
    menu = await canvas.findByTestId("dropdown-menu");
    await waitFor(() => {
      expect(menu).toBeInTheDocument();
    });
    await userEvent.keyboard("{arrowdown}");
    await userEvent.keyboard("{enter}");
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
      expect(input).toHaveValue("바나나");
    });
  },
};
