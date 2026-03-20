// EmployeeTable.tsx
import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Spinner } from "../ui/spinner";
import { Search } from "lucide-react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function EmployeeTable() {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [submitted, setSubmitted] = useState("");
    const limit = 10;

    const { data, isLoading, isError } = useEmployees(page, limit, submitted);

    const pageCount = Math.ceil((data?.total ?? 0) / limit);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(0);
        setSubmitted(search);
    };

    if (isLoading)
        return (
            <div className="flex flex-col gap-3 items-center justify-center mt-20 h-full w-full">
                <h1>Loading Data... </h1>
                <Spinner />
            </div>
        );

    if (isError)
        return (
            <div className="flex flex-col gap-3 items-center justify-center mt-20 h-full w-full">
                <h1>Failed to load Data... </h1>
            </div>
        );

    return (
        <div className="mx-auto">
            <div className="text-xs tracking-wider flex items-center gap-1">
                <h1 className=" text-gray-400">MAIN CONSOLE</h1> <ArrowForwardIosIcon className="text-gray-400" sx={{ fontSize: 10 }} /> <h1 className="text-primary font-semibold">EMPLOYEES DIRECTORY</h1>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center justify-between gap-2 mb-2 h-full p-2">
                <h1 className="text-lg md:text-3xl font-bold">Employees</h1>
                <div className="flex gap-1 items-center">
                    <div className="w-full h-9 bg-white border rounded-sm flex items-center max-w-sm px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <Search size={16} color="grey" />
                        <input type="text" placeholder="Search Employee Name" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full max-w-sm px-4 bg-[#f8f9ff] text-sm outline-none" />
                    </div>
                    <button type="submit" className="px-4 h-9 bg-primary text-white rounded text-sm">
                        Search
                    </button>
                </div>
            </form>
            <DataTable columns={columns} data={data?.users ?? []} pageCount={pageCount} page={page} onPageChange={setPage} />
        </div>
    );
}
