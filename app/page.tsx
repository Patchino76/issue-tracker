import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const queryParams = new URLSearchParams();
  const currentPage = queryParams.get("page")
    ? parseInt(queryParams.get("page")!)
    : 1;
  return (
    <Pagination
      itemCount={100}
      pageSize={10}
      currentPage={
        searchParams.page ? parseInt(searchParams.page) : currentPage
      }
    />
  );
}
