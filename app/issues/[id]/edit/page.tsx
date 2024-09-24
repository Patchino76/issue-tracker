import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "@/app/issues/_components/IssueForm";

interface Props {
  params: { id: string };
}

const EditIssuePage =  async({ params :{id}}: Props) => {
  console.log(id)
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) return notFound()

  return (
  <>
  <IssueForm issue = {issue} />
  </>
  )
};

export default EditIssuePage;
   