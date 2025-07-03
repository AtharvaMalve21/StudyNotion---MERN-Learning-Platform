import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { toast } from "react-hot-toast";

const Navbar = () => {

    var { setIsLoggedIn, setUser, user } = useContext(UserContext);

    const navigate = useNavigate();


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    },[user])

    const logoutUser = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
        toast.success("User is successfully logged out");
        navigate("/login");
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src="/Logo-Full-Light.png"
                        alt="Logo"
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link to="/" className="hover:text-gray-300 transition">Home</Link>
                    <Link to="/about" className="hover:text-gray-300 transition">About</Link>
                    <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
                </div>

                {/* Auth Buttons */}
                {
                    user ? <div className="flex items-center space-x-3 text-sm">
                        <button
                            onClick={logoutUser}
                            className="px-4 py-1.5 border border-white rounded hover:bg-white hover:text-black transition duration-300"
                        >
                            Log out
                        </button>
                        <Link
                            to="/dashboard"
                            className="px-4 py-1.5 bg-white text-black rounded hover:bg-gray-200 transition duration-300"
                        >
                            Dashboard
                        </Link>
                    </div> : <div className="flex items-center space-x-3 text-sm">
                        <Link
                            to="/login"
                            className="px-4 py-1.5 border border-white rounded hover:bg-white hover:text-black transition duration-300"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-200 hover:text-gray-800 transition duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                }
            </div>
        </nav>
    );
};

export default Navbar;
