import prisma from "@/prisma/client";
import { Link, Table } from "@radix-ui/themes";
import React from "react";
import IssuesStatusBadge from "../api/components/IssuesStatusBadge";
import delay from "delay";
import IssueActions from "./IssueActions";
import CustomLink from "../api/components/CustomLink";
const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(3000);
  return (
    <div className="container w-1/2 space-y-4">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header className="bg-gray-400 text-white">
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink  href={`/issues/${issue.id}`}>{issue.title}</CustomLink>
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
    </div>
  );
};

export default IssuesPage;
