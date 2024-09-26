'use client';
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


const handleDeletion = async (issueId: number, router: AppRouterInstance) => {
  
  try{
    await axios.delete(`/api/issues/${issueId}`);
    router.push("/issues");
    router.refresh()
  }
  catch(error){
    console.log(error); 
  }
}

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root> 
      <AlertDialog.Trigger>
      <Button className="w-full" color="red">
        <TrashIcon />
        Delete Issue
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
            <Button color="red" variant="soft" onClick={() => handleDeletion(issueId, router)}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
       
    </AlertDialog.Root>

  );
};

export default DeleteIssueButton;
  