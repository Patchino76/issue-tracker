import { Status } from "@prisma/client";
import { Badge, Flex } from "@radix-ui/themes";
import React from "react";

const statusMap : Record<Status, { label: string; color: "red" | "violet" | "green"}> =
{
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
}

const IssuesStatusBadge = ({status} : {status : Status}) => {
  return (
    <div>
      <Flex gap="2">
        <Badge color={statusMap[status].color} >{statusMap[status].label}</Badge>
      </Flex>
    </div>
  );
};

export default IssuesStatusBadge;
