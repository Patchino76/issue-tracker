import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

interface Props {
  params: { id: string };
}
 
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false, loading: () => <IssueFormSkeleton />
});

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
   