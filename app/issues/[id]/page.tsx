import IssuesStatusBadge from "@/app/api/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  // if(typeof parseInt(params.id) !== 'number') notFound()
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue?.title ?? "Issue not found"}</Heading>
      <Flex className="space-x-3" my="2">
        <IssuesStatusBadge status={issue.status} />
        <Text>Created at: {issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
      <p>Description: {issue?.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
