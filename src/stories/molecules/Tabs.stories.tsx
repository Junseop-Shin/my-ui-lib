import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/molecules/Tabs';

const meta = {
    title: 'Molecules/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div className="bg-slate-950 p-8 w-[400px] text-white">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultValue: 'account',
        children: (
            <>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <div className="p-4 rounded border border-slate-800 bg-slate-900 mt-2">
                        Make changes to your account here.
                    </div>
                </TabsContent>
                <TabsContent value="password">
                    <div className="p-4 rounded border border-slate-800 bg-slate-900 mt-2">
                        Change your password here.
                    </div>
                </TabsContent>
            </>
        ),
    },
};
