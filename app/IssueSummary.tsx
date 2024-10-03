import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import NextLink from "next/link";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {

  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open issues", value: open, status: "OPEN" },
    { label: "In Progress issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex  gap={"5"}>
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction={"column"} gap={"2"} align={"start"}>
            <NextLink className="text-sm font-medium" href={`/issues/list?status=${container.status}`}>
              {container.label}
            </NextLink>
            <Text size={"5"} className="font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
