import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box, Table } from "@radix-ui/themes";
import delay from "delay";
import CustomLink from "../../components/CustomLink";
import IssuesStatusBadge from "../../components/IssuesStatusBadge";
import IssueActions from "./IssueActions";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status | "ALL", orderBy: keyof Issue, page: string };
}) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  // const where =
  const orderBy = searchParams.orderBy ? {[searchParams.orderBy] :"asc"}  : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const where = {
    status: searchParams.status === "ALL" ? undefined : searchParams.status,
  }
  const issues = await prisma.issue.findMany({

    where,
    orderBy : orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({
    where
  })
  await delay(1000);
  return (
    <Box className="max-w-xl space-y-3">
      <IssueActions />
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
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Box>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
