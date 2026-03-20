import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Employee>[] = [
    {
        header: () => <span className="tracking-wider text-xs text-gray-400">EMPLOYEE</span>,
        accessorKey: "firstName",
        cell: ({ row }) => {
            const employee = row.original;

            return (
                <div className="flex items-center gap-3">
                    <img src={employee.image} alt={employee.firstName} className="w-10 h-10 rounded-full" />

                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs md:text-sm tracking-wide truncate">
                            {employee.firstName} {employee.lastName}
                        </span>

                        <span className="text-sm text-gray-500">ID: {employee.id}</span>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: () => <span className="tracking-wider text-xs text-gray-400">CONTACT INFO</span>,
        cell: ({ row }) => {
            const employee = row.original;
            return (
                <div className="space-y-1">
                    <div className="text-xs tracking-tight font-medium text-primary">{employee.email}</div>
                    <div className="text-xs tracking-tight font-medium text-secondary/70">{employee.phone}</div>
                </div>
            );
        },
    },
    {
        accessorKey: "company.department",
        header: () => <span className="tracking-wider text-xs text-gray-400">DEPARTMENT</span>,
        cell: ({ row }) => {
            const employee = row.original;
            return <span className="text-sm bg-[#f1f5f9] px-2 py-1 text-secondary rounded tracking-tight font-medium #f1f5f9">{employee.company.department}</span>;
        },
    },
    {
        accessorKey: "company.title",
        header: () => <span className="tracking-wider text-xs text-gray-400">JOB TITLE</span>,
        cell: ({ row }) => {
            const employee = row.original;
            return <span className="text-sm tracking-tight font-medium text-secondary">{employee.company.title}</span>;
        },
    },
];
