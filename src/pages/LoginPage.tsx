import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/types/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { mutate, isPending } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        mode: "all",
    });

    const userNameValue = watch("username");
    const passwordValue = watch("password");

    const onSubmit = (data: LoginFormValues) => {
        mutate(data);
    };
    return (
        <div className="bg-background flex flex-col gap-5 justify-center items-center h-screen w-screen ">
            <div className="text-center tracking-tight space-y-1">
                <CorporateFareIcon className="text-primary" style={{ fontSize: 48 }} />
                <div className="-space-y-2">
                    <h1 className="font-bold text-2xl">TechDir Enterprise</h1>
                    <h1 className="font-light text-gray-500">Internal HR Management Console</h1>
                </div>
            </div>
            <div className="bg-white rounded tracking-tight p-8 flex flex-col gap-5 w-90 max-w-sm space-y-3 shadow-lg shadow-grey-300">
                <div className="">
                    <h1 className="text-lg font-bold">Employee Directory</h1>
                    <h2 className="font-light text-gray-500">Internal HR Portal</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="text-sm text-[#697381] font-semibold space-y-1">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="tracking-wider">
                            USERNAME
                        </label>
                        <div
                            className={`flex items-center gap-2 border  ${!errors.username && userNameValue?.length > 0 ? "border-green-500" : "border-gray-300"} rounded p-2 focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition`}
                        >
                            <PersonIcon className="text-gray-500" style={{ fontSize: 16 }} />
                            <input type="text" id="username" placeholder="e.g ismailzhaf" className="outline-none bg-transparent" {...register("username")} />
                        </div>
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="tracking-wider">
                            PASSWORD
                        </label>
                        <div
                            className={`flex gap-2 border  ${!errors.password && passwordValue?.length > 0 ? "border-green-500" : "border-gray-300"} rounded p-2 focus-within:border-tertiary focus-within:ring-1 focus-within:ring-tertiary transition`}
                        >
                            <LockIcon className="text-gray-500" style={{ fontSize: 16 }} />
                            <input type={showPassword ? "text" : "password"} id="password" placeholder="••••••" className="outline-none bg-transparent flex-1" {...register("password")} />
                            <button aria-label="toggle visibility" type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500">
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <Button type="submit" className={`${isPending ? "bg-primary/30" : "bg-primary"} rounded w-full px-4 mt-5 py-6 hover:cursor-pointer`}>
                        Sign In <LogIn size={16} className="ml-2" />
                    </Button>
                </form>
            </div>
        </div>
    );
};
