"use client";
import Skeleton from "@/app/components/Skeleton";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

const AssigneeSelect = async ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    if (userId === "0")
      axios
        .patch(`/api/issues/${issue.id}`, { assignedToUserId: null })
        .catch((err) => toast.error("Changes cound not be saved"));
    else
      axios
        .patch(`/api/issues/${issue.id}`, { assignedToUserId: userId })
        .catch((err) => toast.error("Changes cound not be saved"));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId ? issue.assignedToUserId : "0"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>

            <Select.Item value="0">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
            {/* <Select.Item value="1">Item 1</Select.Item> */}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster></Toaster>
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/users").then((res) => res.data),
    staleTime: 1000 * 60, // 1 minute
    retry: 3,
  });

export default AssigneeSelect;
