'use client';
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";




const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteIssue = async (issueId: number) => {
    try{
      // throw new Error();
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh()
    }
    catch(error){
      setError(true); 
      setIsDeleting(false);
    }
  }
  return (
    <>
    <AlertDialog.Root> 
      <AlertDialog.Trigger>
      <Button className="w-full" color="red" disabled={isDeleting}>
        <TrashIcon />
        Delete Issue
        {isDeleting && <Spinner />}
      </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
        <Flex className="justify-end gap-3 mt-4">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" 
            variant="soft" 
            onClick={() => onDeleteIssue(issueId)} 
             >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This issue cannot be deleted.</AlertDialog.Description>
        <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>OK</Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
  