// import { within, userEvent, waitFor } from "@storybook/testing-library";
// import { expect, jest } from "@storybook/jest";
// import { screen } from "@storybook/test";
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

// table default interaction test
export const PersonTable: TableStory = {
  args: {
    data: generatePeople(30),
  },
};
