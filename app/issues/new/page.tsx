// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false, loading: () => <IssueFormSkeleton />
});

const NewIssuesPage = async () => {
  return <IssueForm />;
};

export default NewIssuesPage;
