import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const navLinks = (
        <>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500 font-bold" : "hover:text-orange-500"}>Home</NavLink></li>
            <li><NavLink to="/meals" className={({ isActive }) => isActive ? "text-orange-500 font-bold" : "hover:text-orange-500"}>Meals</NavLink></li>
            {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-orange-500 font-bold" : "hover:text-orange-500"}>Dashboard</NavLink></li>}
        </>
    );

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Link to="/" className="text-2xl font-black text-orange-600">LocalChefBazaar</Link>
                <ul className="hidden md:flex gap-6 font-medium text-gray-700 ml-10">{navLinks}</ul>
            </div>
            
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        <img src={user?.photoURL} alt="Profile" className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover" title={user?.displayName} />
                        <button onClick={logOut} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;