import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { useLogout } from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";

interface NavbarProps {
    onMenuClick?: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
    const [user] = useAtom(userAtom);
    const handleLogout = useLogout();

    return (
        <nav className="w-full bg-white shadow border-b p-2 md:p-5 flex items-center justify-between z-50">
            {/* Left: Hamburger (mobile) + Logo */}
            <div className="flex items-center gap-3 tracking-tighter">
                <button className="md:hidden text-gray-600 hover:text-gray-900 transition" onClick={onMenuClick}>
                    <MenuIcon />
                </button>
                <div className="text-lg md:text-2xl text-gray-900">
                    <span className="font-semibold">TechDir</span> <span className="font-bold">Enterprise</span>
                </div>
            </div>

            {/* Right: User actions */}
            <div className="flex items-center gap-2 h-full">
                <div className="flex gap-4 p-4">
                    <NotificationsIcon sx={{ fontSize: { xs: 20, md: 24 } }} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition" />
                    <HelpIcon sx={{ fontSize: { xs: 20, md: 24 } }} className="text-gray-500 hover:text-gray-700 hover:cursor-pointer transition" />
                </div>
                <div className="w-px h-full bg-border" />
                <div className="flex items-center gap-2">
                    <h1 className="font-bold tracking-tight hidden sm:block">{user?.firstName}</h1>
                    <img src={user?.image} alt={user?.username} className="w-6 h-6 md:w-10 md:h-10 rounded-full" />
                    <button onClick={handleLogout} className="flex items-center gap-1 hover:cursor-pointer text-primary font-semibold hover:text-red-600 transition">
                        <h1 className="hidden lg:block">Sign Out</h1>
                        <LogOutIcon className="block md:hidden" size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
};
