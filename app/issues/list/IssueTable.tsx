import CustomLink from '@/app/components/CustomLink'
import IssuesStatusBadge from '@/app/components/IssuesStatusBadge'
import { Table } from '@radix-ui/themes'
import React from 'react'
import NextLink from "next/link";
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Issue } from '@prisma/client';

interface Props{
    issues : Issue[]
    searchParams : {
        orderBy : keyof Issue
    }
}

const IssueTable = ({issues, searchParams} : Props) => {
    const columns: {
        label: string;
        value: keyof Issue;
        className?: string;
      }[] = [
        { label: "Issue", value: "title" },
        { label: "Status", value: "status", className: "hidden md:table-cell" },
        { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
      ];
  return (
    <Table.Root variant="surface">
    <Table.Header className="bg-gray-400 text-white">
      <Table.Row>
        {columns.map((column) => (
          <Table.ColumnHeaderCell
            key={column.value}
            className={column.className}
          >
            <NextLink href={{
              query : {...searchParams, orderBy: column.value},
            }}>{column.label}</NextLink>
            {searchParams.orderBy === column.value && <ArrowUpIcon className="inline"/>}
          </Table.ColumnHeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {issues.map((issue) => (
        <Table.Row key={issue.id}>
          <Table.Cell>
            <CustomLink href={`/issues/${issue.id}`}>
              {issue.title}
            </CustomLink>
            <div className="block md:hidden">
              <IssuesStatusBadge status={issue.status} />
            </div>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            <IssuesStatusBadge status={issue.status} />
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            {issue.createdAt.toDateString()}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
  )
}

export default IssueTable
