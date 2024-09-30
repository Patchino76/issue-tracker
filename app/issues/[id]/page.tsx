// 'use client';
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  await delay(1000);
  return (
    <Grid className="max-w-xl" columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box  className="space-y-3 lg:col-span-3">
        <IssueDetails issue={issue} />
      </Box>
      <Box className="col-span-2">
        <Flex className="space-y-3"  direction={"column"} justify={"center"}>
          <AssigneeSelect issue={issue}/>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
