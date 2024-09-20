import CustomLink from "@/app/api/components/CustomLink";
import IssuesStatusBadge from "@/app/api/components/IssuesStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
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
  await delay(1000);
  return (
    <Grid className="max-w-xl" columns={{initial:"1", md:"2"}} gap={"5"}>
      <Box width={"full"} className="space-y-3" >
        <Heading>{issue?.title ?? "Issue not found"}</Heading>
        <Flex className="space-x-3" my="2">
          <IssuesStatusBadge status={issue.status} />
          <Text>Created at: {issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          <p>Description: {issue?.description}</p>
        </Card>
      </Box>
      <Box> 
        <Button>
          <Pencil2Icon />
          <CustomLink href={`/issues/${issue.id}/edit`}>Edit Issue</CustomLink>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
