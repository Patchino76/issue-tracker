import prisma from "@/prisma/client";
import { Avatar, Card, Container, Flex, Heading, Link, Table } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";
import IssuesStatusBadge from "./components/IssuesStatusBadge";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
        assignedToUser: true
    }
  });
  return (
    <Card>
        <Heading size="4" mb={"5"}>Latest Issues</Heading>
        <Table.Root variant="ghost">
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify={"between"}>
                      <Flex direction={"column"} gap={"2"} align={"start"}>
                        <NextLink href={`/issues/${issue.id}`}>{issue.title}</NextLink>
                        <IssuesStatusBadge status={issue.status} />
                      </Flex>
                      {issue.assignedToUser && (
                          <Avatar size={"2"} radius={"full"}
                              src={issue.assignedToUser.image!}
                              alt="Avatar"
                              fallback="?"
                          />
                      )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
    </Card>
  );
};

export default LatestIssues;
