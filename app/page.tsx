import Pagination from "./components/Pagination";


export default function Home({searchParams}: {searchParams: {page: string}}) {
  const queryParams = new URLSearchParams(searchParams)
  const currentPage = queryParams.get("page") ? parseInt(queryParams.get("page")!) : 1
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={currentPage}/>
  );
}
