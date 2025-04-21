import { within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import ExampleTable from "./ExampleTable";
import { generatePeople } from "./ExampleTableMockdata";

const meta = {
  title: "Example/Table",
  component: ExampleTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: false,
      description: "Table data (mocked with faker)",
    },
  },
} satisfies Meta<typeof ExampleTable>;

export default meta;
export type TableStory = StoryObj<typeof meta>;

// table default rendering test
export const PersonTable: TableStory = {
  args: {
    data: generatePeople(30),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 테이블 요소가 존재하는가
    const table = await canvas.findByRole("table");
    expect(table).toBeInTheDocument();

    // 헤더가 렌더링 됐는가
    const headers = await canvas.findAllByRole("columnheader");
    expect(headers.length).toBeGreaterThan(0);

    // 예: name 컬럼이 존재하는가
    expect(await canvas.findByText(/이름/i)).toBeInTheDocument();

    // 적어도 하나 이상의 row가 렌더링 됐는가 (thead 제외)
    const rows = await canvas.findAllByRole("row");
    expect(rows.length).toBeGreaterThan(1); // thead + tbody rows
  },
};

// row selection test
export const SelectRow: TableStory = {
  args: {
    data: generatePeople(10),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const rowCheckbox = await canvas.findByTestId("select-row-checkbox-1");
    await userEvent.click(rowCheckbox);
    expect(rowCheckbox).toBeChecked();

    const checkbox = await canvas.findByTestId("select-all-checkbox");
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const rowCheckbox2 = await canvas.findByTestId("select-row-checkbox-2");
    expect(rowCheckbox2).toBeChecked();
    await userEvent.click(rowCheckbox2);
    expect(rowCheckbox2).not.toBeChecked();

    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(rowCheckbox2).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(rowCheckbox).not.toBeChecked();
    expect(rowCheckbox2).not.toBeChecked();
  },
};

// sort test
export const SortInteractionTest: TableStory = {
  args: {
    data: generatePeople(10),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 정렬 대상이 될 연차 컬럼 버튼
    const sortButton = await canvas.findByTestId("sort-button-years");

    // 정렬 초기 상태: 아이콘이 ▲▼
    expect(sortButton).toHaveTextContent("▲▼");
    const firstRow = await canvas.findAllByRole("cell", {
      name: /^\d+년$/,
    }); // 연차 셀
    const years = firstRow.map((row) => row.textContent);

    // 1회 클릭 → 오름차순 (▲)
    await userEvent.click(sortButton);
    expect(sortButton).toHaveTextContent("▲");

    const firstRowAsc = await canvas.findAllByRole("cell", {
      name: /^\d+년$/,
    });
    const ascYears = firstRowAsc.map((row) => row.textContent);

    // 숫자만 잘라서 sorting하기 위한 함수
    const extractNumber = (text: string) =>
      parseInt(text.replace(/[^0-9]/g, ""), 10);
    expect(ascYears).toEqual(
      [...years].sort((a, b) => extractNumber(a!) - extractNumber(b!))
    );

    // 2회 클릭 → 내림차순 (▼)
    await userEvent.click(sortButton);
    expect(sortButton).toHaveTextContent("▼");

    const firstRowDesc = await canvas.findAllByRole("cell", {
      name: /^\d+년$/,
    });
    const descYears = firstRowDesc.map((row) => row.textContent);
    expect(descYears).toEqual(
      [...years].sort((a, b) => extractNumber(b!) - extractNumber(a!))
    );

    // 3회 클릭 → 정렬 해제 (▲▼)
    // tanstack의 정렬 기능은 정렬 해제 후 처음 정렬 상태로 돌아오지 않음
    await userEvent.click(sortButton);
    expect(sortButton).toHaveTextContent("▲▼");
  },
};

// column visibility test
// 컬럼 숨김되면 해당 컬럼 element가 사라지는 것을 확인
export const ToggleColumnVisibility: TableStory = {
  args: {
    data: generatePeople(10),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdownSplitButton = await canvas.findByTestId(
      "dropdown-toggle-button"
    );
    const phones = await canvas.findAllByRole("cell", {
      name: /^\d{2,3}-\d{3,5}-\d{4}$/,
    }); // 이름 셀
    expect(phones.length).not.toBe(0);

    await userEvent.click(dropdownSplitButton);
    const phoneOption = await canvas.findAllByText(/전화번호/i);
    await userEvent.click(phoneOption[0]); // hide phone column
    await waitFor(() => {
      const hiddenPhones = canvas.queryAllByRole("cell", {
        name: /^\d{2,3}-\d{3,5}-\d{4}$/,
      });
      expect(hiddenPhones.length).toBe(0);
    });

    await userEvent.click(phoneOption[0]); // show phone column
    await waitFor(() => {
      const hiddenPhones = canvas.queryAllByRole("cell", {
        name: /^\d{2,3}-\d{3,5}-\d{4}$/,
      });
      expect(hiddenPhones.length).not.toBe(0);
    });
  },
};

// // combined interaction test
// export const CombinedInteraction: TableStory = {
//   args: {
//     data: generatePeople(15),
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     // Select a row
//     const checkboxes = await canvas.findAllByRole("checkbox");
//     await userEvent.click(checkboxes[1]);
//     expect(checkboxes[1]).toBeChecked();

//     // Sort by age
//     const ageSortBtn = await canvas.findByRole("button", { name: /age/i });
//     await userEvent.click(ageSortBtn);
//     expect(ageSortBtn).toBeInTheDocument();

//     // Hide 'email' column
//     const dropdown = await canvas.findByText("컬럼 선택");
//     await userEvent.click(dropdown);
//     const emailOption = await canvas.findByText(/email/i);
//     await userEvent.click(emailOption);
//     await waitFor(() => {
//       expect(canvas.queryByText(/@/)).not.toBeInTheDocument();
//     });
//   },
// };
