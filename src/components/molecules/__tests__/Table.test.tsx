import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../Table'

function SampleTable() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Junseop</Table.Cell>
          <Table.Cell>Frontend Engineer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

describe('Table', () => {
  it('renders headers', () => {
    render(<SampleTable />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders body cells', () => {
    render(<SampleTable />)
    expect(screen.getByText('Junseop')).toBeInTheDocument()
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument()
  })

  it('supports named exports (backward compat)', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow><TableHead>Col</TableHead></TableRow>
        </TableHeader>
        <TableBody>
          <TableRow><TableCell>Val</TableCell></TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByText('Col')).toBeInTheDocument()
    expect(screen.getByText('Val')).toBeInTheDocument()
  })
})
