import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '../DataTable'

type Person = { name: string; role: string }

const columns: ColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
]

const data: Person[] = [
  { name: 'Junseop', role: 'Frontend' },
  { name: 'Alice', role: 'Backend' },
  { name: 'Bob', role: 'Design' },
]

describe('DataTable', () => {
  it('renders all rows', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Junseop')).toBeInTheDocument()
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('filters rows by global filter input', async () => {
    render(<DataTable columns={columns} data={data} filterPlaceholder="Filter…" />)
    const input = screen.getByPlaceholderText('Filter…')
    await userEvent.type(input, 'Alice')
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText('Junseop')).not.toBeInTheDocument()
  })

  it('shows empty state when no results', async () => {
    render(<DataTable columns={columns} data={data} />)
    await userEvent.type(screen.getByRole('textbox'), 'zzzzz')
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('renders empty state when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />)
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })
})
