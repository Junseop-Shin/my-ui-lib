import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/molecules/Form'
import { Input } from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { Select } from '@/components/atoms/Select'
import { Checkbox } from '@/components/atoms/Checkbox'

const meta: Meta = {
  title: 'Molecules/Form',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj

export const LoginForm: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { email: '', password: '' },
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="w-[360px] space-y-4"
        >
          <Form.Field
            control={form.control}
            name="email"
            rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } }}
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Input placeholder="you@example.com" type="email" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="password"
            rules={{ required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } }}
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                  <Input placeholder="••••••••" type="password" {...field} />
                </Form.Control>
                <Form.Description>Must be at least 8 characters.</Form.Description>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </Form>
    )
  },
}

export const ProfileForm: Story = {
  render: () => {
    const form = useForm({
      defaultValues: { name: '', role: '', newsletter: false },
    })

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))}
          className="w-[400px] space-y-4"
        >
          <Form.Field
            control={form.control}
            name="name"
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Full name</Form.Label>
                <Form.Control>
                  <Input placeholder="Junseop Shin" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="role"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Role</Form.Label>
                <Form.Control>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <Select.Trigger>
                      <Select.Value placeholder="Select your role" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="frontend">Frontend Engineer</Select.Item>
                      <Select.Item value="backend">Backend Engineer</Select.Item>
                      <Select.Item value="fullstack">Full Stack Engineer</Select.Item>
                    </Select.Content>
                  </Select>
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <Form.Item className="flex-row items-center gap-3">
                <Form.Control>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Form.Control>
                <div>
                  <Form.Label className="cursor-pointer">Subscribe to newsletter</Form.Label>
                  <Form.Description>Get updates on new features.</Form.Description>
                </div>
              </Form.Item>
            )}
          />
          <Button type="submit" className="w-full">Save profile</Button>
        </form>
      </Form>
    )
  },
}
