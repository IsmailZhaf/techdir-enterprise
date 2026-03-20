import { useQuery } from "@tanstack/react-query";
import { employeeServices } from "@/services/employeeService";

export const useEmployees = (page: number, limit: number, search: string) => {
    return useQuery({
        queryKey: ["employees", page, limit, search],
        queryFn: () => (search ? employeeServices.search(search) : employeeServices.getAll(page, limit)),
        placeholderData: (prev) => prev,
    });
};

export const useEmployeeDetail = (id: string) => {
    return useQuery({
        queryKey: ["employee", id],
        queryFn: () => employeeServices.getById(id),
        retry: false,
    });
};
