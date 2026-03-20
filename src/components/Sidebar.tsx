import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface SidebarProps {
    onNavigate?: () => void;
}

export const Sidebar = ({ onNavigate }: SidebarProps) => {
    const { pathname } = useLocation();
    const navigation = [{ name: "Employees", href: "/employees", icon: PeopleAltIcon }];

    return (
        <div className="h-full w-50 bg-surface-container-low">
            <nav className="h-full flex flex-col justify-between">
                <div className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                to={item.href}
                                key={item.name}
                                onClick={onNavigate}
                                className={`flex items-center space-x-3 px-4 py-3 my-8 rounded-l-lg w-full font-semibold transition-colors ${
                                    isActive ? "bg-white text-primary border-r-3 border-primary" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};
