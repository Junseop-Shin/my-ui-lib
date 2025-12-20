import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/Checkbox';
import { Label } from '../components/Label';

const meta = {
    title: 'Atomic/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms2" disabled />
            <Label htmlFor="terms2">Accept terms and conditions</Label>
        </div>
    ),
};

export const Checked: Story = {
    render: () => (
        <div className="flex items-center space-x-2">
            <Checkbox id="terms3" defaultChecked />
            <Label htmlFor="terms3">Accept terms and conditions</Label>
        </div>
    ),
};
