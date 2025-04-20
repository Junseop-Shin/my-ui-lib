import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import { screen } from "@storybook/test";
import { Dropdown } from "../../common/Dropdown";
import { Meta } from "@storybook/react";
import { DropdownStory } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Example/Dropdown/ButtonDropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

// button type dropdown default interaction test
export const ButtonDropdown: DropdownStory = {
  args: {
    triggerType: "button",
    multiSelect: false,
    buttonLabel: "ButtonDropdown",
    handleButtonClick: jest.fn(),
    onValueChange: jest.fn(),
    options: [
      { label: "사과", value: "apple", description: "빨가면 사과" },
      { label: "바나나", value: "banana", description: "맛있으면 바나나" },
      { label: "오렌지", value: "orange" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. button label 테스트
    const button = canvas.getByText("ButtonDropdown");
    expect(button).toBeInTheDocument();

    // 2. button icon 테스트
    const buttonIcon = canvas.queryByTestId("dropdown-button-icon");
    expect(buttonIcon).not.toBeInTheDocument();

    // 3. button handleClick 테스트
    await userEvent.click(button);
    expect(args.handleButtonClick).toHaveBeenCalled();

    // 4. 드롭다운 열기, 스플릿 버튼 방향 테스트
    const chevron = canvas.getByTestId("chevron-icon");
    expect(chevron).toHaveClass("rotate-0");
    const toggleButton = canvas.getByTestId("dropdown-toggle-button");
    await userEvent.click(toggleButton);
    const menu = await canvas.findByTestId("dropdown-menu");
    expect(menu).toBeInTheDocument();
    expect(chevron).toHaveClass("rotate-180");

    // 5. 옵션 hover
    const option = await canvas.findByText("사과");
    expect(option).toBeInTheDocument();
    expect(option).not.toHaveClass("bg-gray-100");

    await userEvent.hover(option);

    // 5-1. hover 시 배경색 변화, 툴팁 확인 (옵션에 description 있을 경우)
    expect(option).toHaveClass("bg-gray-100");
    const description = await screen.findByText("빨가면 사과"); // createPortal 때문에 screen.findByText 사용
    // const description = canvas.getByTestId("tooltip");
    expect(description).toBeInTheDocument();

    // 5-2. 옵션 클릭
    // 메뉴 닫기 및 값 선택 확인
    await userEvent.click(option);
    await waitFor(() => {
      expect(option).not.toBeInTheDocument();
    });
    expect(args.onValueChange).toHaveBeenCalledWith(["apple"]);

    // 메뉴 재오픈 시 option 배경 색 변화(selected), check 표시 확인
    await userEvent.click(toggleButton);
    expect(option).toHaveClass("bg-gray-200");
    expect(option).toHaveTextContent("✔");

    // 6. 메뉴 닫기
    await userEvent.click(toggleButton);
    expect(chevron).toHaveClass("rotate-0");
    expect(menu).not.toBeInTheDocument();
  },
};

// button type dropdown icon test
export const ButtonDropdownIcon: DropdownStory = {
  args: {
    triggerType: "button",
    multiSelect: false,
    buttonLabel: "ButtonDropdown",
    buttonIcon: <div />,
    options: [
      { label: "사과", value: "apple", description: "빨가면 사과" },
      { label: "바나나", value: "banana", description: "맛있으면 바나나" },
      { label: "오렌지", value: "orange" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. button label 테스트
    const button = canvas.queryByText("ButtonDropdown");
    expect(button).not.toBeInTheDocument();

    // 2. button icon 테스트
    const buttonIcon = canvas.getByTestId("dropdown-button-icon");
    expect(buttonIcon).toBeInTheDocument();
  },
};

const positionClassMap = {
  "top-left": "bottom-full left-0 mb-1",
  "top-right": "bottom-full right-0 mb-1",
  "bottom-left": "top-full left-0 mt-1",
  "bottom-right": "top-full right-0 mt-1",
} as const;
// button type dropdown menuPosition test: "top-left"
export const PositionTestTopLeft: DropdownStory = {
  args: {
    triggerType: "button",
    multiSelect: false,
    buttonLabel: "PositionDropdown",
    menuPosition: "top-left",
    options: [
      { label: "사과", value: "apple" },
      { label: "바나나", value: "banana" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("dropdown-toggle-button");
    // 드롭다운 열기
    await userEvent.click(toggleButton);

    // 메뉴 엘리먼트 찾기
    const menu = await canvas.findByTestId("dropdown-menu");
    expect(menu.className).toContain(positionClassMap[args.menuPosition!]);

    // 메뉴 닫기
    await userEvent.click(toggleButton);
  },
};
// button type dropdown menuPosition test: "top-right"
export const PositionTestTopRight: DropdownStory = {
  args: {
    triggerType: "button",
    multiSelect: false,
    buttonLabel: "PositionDropdown",
    menuPosition: "top-right",
    options: [
      { label: "사과", value: "apple" },
      { label: "바나나", value: "banana" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("dropdown-toggle-button");
    // 드롭다운 열기
    await userEvent.click(toggleButton);

    // 메뉴 엘리먼트 찾기
    const menu = await canvas.findByTestId("dropdown-menu");
    expect(menu.className).toContain(positionClassMap[args.menuPosition!]);

    // 메뉴 닫기
    await userEvent.click(toggleButton);
  },
};
// button type dropdown menuPosition test: "bottom-left"
export const PositionTestBottomLeft: DropdownStory = {
  args: {
    triggerType: "button",
    multiSelect: false,
    buttonLabel: "PositionDropdown",
    menuPosition: "bottom-left",
    options: [
      { label: "사과", value: "apple" },
      { label: "바나나", value: "banana" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("dropdown-toggle-button");
    // 드롭다운 열기
    await userEvent.click(toggleButton);

    // 메뉴 엘리먼트 찾기
    const menu = await canvas.findByTestId("dropdown-menu");
    expect(menu.className).toContain(positionClassMap[args.menuPosition!]);

    // 메뉴 닫기
    await userEvent.click(toggleButton);
  },
};
// button type dropdown menuPosition test: "bottom-right"
export const PositionTestBottomRight: DropdownStory = {
  args: {
    triggerType: "button",
    multiSelect: false,
    buttonLabel: "PositionDropdown",
    menuPosition: "bottom-right",
    options: [
      { label: "사과", value: "apple" },
      { label: "바나나", value: "banana" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByTestId("dropdown-toggle-button");
    // 드롭다운 열기
    await userEvent.click(toggleButton);

    // 메뉴 엘리먼트 찾기
    const menu = await canvas.findByTestId("dropdown-menu");
    expect(menu.className).toContain(positionClassMap[args.menuPosition!]);

    // 메뉴 닫기
    await userEvent.click(toggleButton);
  },
};
