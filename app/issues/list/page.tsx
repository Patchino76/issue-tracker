import prisma from "@/prisma/client";
import { Box, Table } from "@radix-ui/themes";
import delay from "delay";
import CustomLink from "../../components/CustomLink";
import IssuesStatusBadge from "../../components/IssuesStatusBadge";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";



const IssuesPage = async ({searchParams} : {searchParams: {status: Status | "ALL"}}) => {

  const issues = await prisma.issue.findMany({
    where: {
      status: searchParams.status === "ALL" ? undefined : searchParams.status,
    },
    orderBy: {
      id: "asc",
    },
  });
  await delay(1000);
  return (
    <Box className="max-w-xl space-y-3">
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
    </Box>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
