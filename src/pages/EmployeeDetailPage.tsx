import { useEmployeeDetail } from "@/hooks/useEmployees";
import { useParams } from "react-router-dom";
import { capitalize } from "@/lib/utils";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";

export const EmployeeDetailPage = () => {
    const { id = "" } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: employee, isLoading, isError, error } = useEmployeeDetail(id);
    const erroMessages = axios.isAxiosError(error) ? (error.response?.data?.message ?? "Terjadi kesalahan") : "Terjadi kesalahan";

    if (isLoading)
        return (
            <div className="flex flex-col gap-3 items-center justify-center mt-20 h-full w-full">
                <h1>Loading Data... </h1>
                <Spinner />
            </div>
        );

    if (isError)
        return (
            <div className="flex flex-col gap-3 items-center justify-center h-full w-full">
                <h1 className="font-semibold text-lg">Employee Not Found</h1>
                <p className="text-sm text-gray-500">{erroMessages}</p>
                <button onClick={() => navigate("/employees")} className="flex items-center gap-1 text-xs bg-secondary py-2 px-4 rounded text-white hover:text-primary transition-colors cursor-pointer">
                    <span>Back</span>
                </button>
            </div>
        );

    if (!employee)
        return (
            <div className="flex flex-col gap-3 items-center justify-center mt-20 h-full w-full">
                <h1>Data Not Available.</h1>
            </div>
        );

    return (
        <div className="space-y-4 md:px-16 md:py-6 content-start w-full">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate("/employees")} className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors cursor-pointer">
                    <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
                    <span>Back</span>
                </button>
                <div className="text-xs tracking-wider flex items-center gap-1">
                    <h1 className=" text-gray-400">DIRECTORY</h1> <ArrowForwardIosIcon className="text-gray-400" sx={{ fontSize: 10 }} /> <h1 className="text-primary font-semibold">EMPLOYEE PROFILE</h1>
                </div>
            </div>
            <div className="card border-l-4 border-primary h-45 md:h-50  flex gap-3  items-center">
                <img src="https://dummyjson.com/icon/emilys/128" alt="Emily Johnson" className="w-16 h-16 md:w-30 md:h-30 rounded-full object-cover" />
                <div className="flex flex-col gap-1 justify-between md:justify-around h-full">
                    <div className="space-y-1">
                        <h2 className="md:text-2xl tracking-tighter font-bold">
                            {employee?.firstName} {employee?.maidenName} {employee?.lastName}
                        </h2>
                        <div className="lg:flex lg:gap-5 text-gray-500">
                            <div className="flex gap-2 items-center text-sm">
                                <EmailIcon className="text-grey-500" style={{ fontSize: 15 }} />
                                <p className="text-xs md:text-sm">{employee?.email}</p>
                            </div>
                            <div className="flex gap-2 items-center text-sm">
                                <LocalPhoneIcon className="text-grey-500" style={{ fontSize: 15 }} />
                                <p className="text-xs md:text-sm">{employee?.phone}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 justify-around">
                        <div>
                            <h1 className="text-xs font-semibold tracking-wider text-gray-500">JOB TITLE</h1>
                            <h1 className="text-xs md:text-sm font-bold">{employee?.company.title}</h1>
                        </div>
                        <div>
                            <h1 className="text-xs font-semibold tracking-wider text-gray-500">DEPARTMENT</h1>
                            <h1 className="text-xs md:text-sm font-bold">{employee?.company.department}</h1>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h1 className="text-xs font-semibold tracking-wider text-gray-500">COMPANY</h1>
                            <h1 className="text-xs md:text-sm font-bold">{employee?.company.name}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <h1 className="font-semibold tracking-wider text-sm md:text-lg">PERSONAL INFORMATION</h1>
                <div className="mx-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <h1 className="title">AGE</h1>
                        <h1 className="text-sm font-medium">{employee?.age} Years</h1>
                    </div>
                    <div>
                        <h1 className="title">GENDER</h1>
                        <h1 className="text-sm font-medium">{capitalize(employee?.gender || "")}</h1>
                    </div>
                    <div>
                        <h1 className="title">BIRTH DATE</h1>
                        <h1 className="text-sm font-medium">{employee?.birthDate}</h1>
                    </div>
                    <div>
                        <h1 className="title">BLOOD GROUP</h1>
                        <h1 className="text-sm font-medium">{employee?.bloodGroup}</h1>
                    </div>
                    <div>
                        <h1 className="title">HEIGHT</h1>
                        <h1 className="text-sm font-medium">{employee?.height} cm</h1>
                    </div>
                    <div>
                        <h1 className="title">WEIGHT</h1>
                        <h1 className="text-sm font-medium">{employee?.weight} kg</h1>
                    </div>
                    <div>
                        <h1 className="title">EYE COLOR</h1>
                        <h1 className="text-sm font-medium">{employee?.eyeColor}</h1>
                    </div>
                    <div>
                        <h1 className="title">HAIR</h1>
                        <h1 className="text-sm font-medium">
                            {employee?.hair.color}, {employee?.hair.type}
                        </h1>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <h1 className="font-semibold tracking-wider text-sm md:text-lg">CONTACT INFORMATION</h1>
                <div className="mx-4 text-sm grid grid-cols-2 gap-2 h-full">
                    <div className="">
                        <h1 className="title">FULL ADDRESS</h1>
                        <h1 className="text-sm font-medium">{employee?.address.address}</h1>
                        <h1 className="text-sm font-medium">
                            {employee?.address.city}, {employee?.address.state} {employee?.address.stateCode} {employee?.address.postalCode}{" "}
                        </h1>
                        <h1 className="text-primary">{employee?.address.country}</h1>
                    </div>
                    <div>
                        <h1 className="title">PHONE NUMBER</h1>
                        <h1 className=" text-sm font-medium">{employee?.phone}</h1>
                    </div>
                    <div>
                        <h1 className="title">EMAIL ADDRESS</h1>
                        <h1 className=" text-sm font-medium">{employee?.email}</h1>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <h1 className="font-semibold tracking-wider text-sm md:text-lg">COMPANY DETAILS</h1>
                <div className="grid grid-cols-2 mx-4 justify-between gap-2 text-sm">
                    <div>
                        <h1 className="title">ORGANIZATION</h1>
                        <h1 className="font-medium">{employee?.company.name}</h1>
                    </div>
                    <div>
                        <h1 className="title">DEPARTMENT</h1>
                        <h1 className="font-medium">{employee?.company.department}</h1>
                    </div>
                    <div>
                        <h1 className="title">TITLE</h1>
                        <h1 className="font-medium">{employee?.company.title}</h1>
                    </div>
                    <div>
                        <h1 className="title">OFFICE ADDRESS</h1>
                        <h1 className="font-medium">
                            {employee?.company.address.address}, {employee?.company.address.state}, {employee?.company.address.stateCode} {employee?.company.address.postalCode}
                        </h1>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="font-semibold text-sm md:text-lg">EDUCATION</h1>
                </div>
                <div className="mx-4">
                    <h1 className="title">UNIVERSITY</h1>
                    <h1 className="font-medium">{employee?.university}</h1>
                </div>
            </div>
        </div>
    );
};
