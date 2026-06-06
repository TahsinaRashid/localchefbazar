import { Outlet, NavLink, Link } from "react-router-dom";
import useRole from "../hooks/useRole";
import useTitle from "../hooks/useTitle";

const DashboardLayout = () => {
    useTitle("Dashboard");
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) return <div className="text-center py-20 font-bold text-orange-500">Loading Dashboard...</div>;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            
            {/* Left Sidebar Navigation */}
            <div className="w-full md:w-64 bg-gray-900 text-white p-6 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                    <Link to="/" className="text-xl font-black text-orange-500 block text-center border-b border-gray-800 pb-4">
                        ChefBazaar Panel
                    </Link>
                    
                    <ul className="space-y-3 text-sm font-medium">
                        {/* --- COMMON LINKS --- */}
                        <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>My Profile</NavLink></li>

                        {/* --- GENERAL USER LINKS --- */}
                        {role === 'user' && (
                            <>
                                <li><NavLink to="/dashboard/my-orders" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>My Orders</NavLink></li>
                                <li><NavLink to="/dashboard/my-reviews" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>My Reviews</NavLink></li>
                            </>
                        )}

                        {/* --- CHEF LINKS --- */}
                        {role === 'chef' && (
                            <>
                                <li><NavLink to="/dashboard/add-meal" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>Add a Meal</NavLink></li>
                                <li><NavLink to="/dashboard/my-meals" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>My Meals</NavLink></li>
                                <li><NavLink to="/dashboard/order-requests" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>Order Requests</NavLink></li>
                            </>
                        )}

                        {/* --- ADMIN LINKS --- */}
                        {role === 'admin' && (
                            <>
                                <li><NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>Manage Users</NavLink></li>
                                <li><NavLink to="/dashboard/platform-stats" className={({ isActive }) => isActive ? "text-orange-500 font-bold block bg-gray-800 p-2.5 rounded-lg" : "hover:text-orange-400 block p-2.5"}>Platform Statistics</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Return to Core Website */}
                <div className="border-t border-gray-800 pt-4 text-center">
                    <Link to="/" className="text-xs text-gray-400 hover:text-white underline">Back to Home Page</Link>
                </div>
            </div>

            {/* Right Main Content Panel */}
            <div className="flex-grow p-8 md:p-12">
                <Outlet />
            </div>

        </div>
    );
};

export default DashboardLayout;