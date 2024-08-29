import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/SideBar/Sidebar";

const Dashboard = () => {
    return (
        <div className="relative md:flex min-h-screen">
            {/* Side bar  */}
            <Sidebar />

            {/* Outlet --> Dynamic content */}
            <div className="flex-1 md:ml-64">
                <div className="p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;