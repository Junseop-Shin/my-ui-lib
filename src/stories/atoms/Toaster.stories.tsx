import type { Meta, StoryObj } from '@storybook/react'
import { Toaster, toast } from '@/components/atoms/Toaster'
import { Button } from '@/components/atoms/Button'

const meta: Meta = {
  title: 'Atoms/Toaster',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast('Event has been created')}>Default</Button>
      <Button variant="secondary" onClick={() => toast.success('Changes saved!')}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error('Something went wrong')}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning('Approaching limit')}>Warning</Button>
      <Button variant="ghost" onClick={() => toast.info('New update available')}>Info</Button>
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Profile updated', {
          description: 'Your profile information has been updated successfully.',
        })
      }
    >
      Show toast with description
    </Button>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast('File deleted', {
          description: 'report_q3.pdf has been removed.',
          action: { label: 'Undo', onClick: () => toast('Restored!') },
        })
      }
    >
      Delete file
    </Button>
  ),
}
