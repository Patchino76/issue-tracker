import IssuesStatusBadge from "@/app/components/IssuesStatusBadge";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title ?? "Issue not found"}</Heading>
      <Flex className="space-x-3" my="2">
        <IssuesStatusBadge status={issue.status} />
        <Text>Created at: {issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <p>Description: {issue?.description}</p>
      </Card>
    </>
  );
};

export default IssueDetails;
