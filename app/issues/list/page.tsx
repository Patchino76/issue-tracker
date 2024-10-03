import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Box } from "@radix-ui/themes";
import delay from "delay";
import IssueActions from "./IssueActions";

import Pagination from "@/app/components/Pagination";
import IssueTable from "./IssueTable";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status | "ALL", orderBy: keyof Issue, page: string };
}) => {
  
  const orderBy = searchParams.orderBy ? {[searchParams.orderBy] :"asc"}  : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const where = {
    status: searchParams.status === "ALL" ? undefined : searchParams.status,
  }
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
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
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Box>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
