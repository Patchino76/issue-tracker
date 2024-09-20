import IssuesStatusBadge from "@/app/api/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  await delay(2000);
  return (
    <Box className="max-w-xl">
      <Heading>{issue?.title ?? "Issue not found"}</Heading>
      <Flex className="space-x-3" my="2">
        <IssuesStatusBadge status={issue.status} />
        <Text>Created at: {issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>Description: {issue?.description}</p>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
