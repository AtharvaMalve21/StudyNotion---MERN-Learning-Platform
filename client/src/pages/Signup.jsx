import React, { useContext, useState } from 'react';
import { UserContext } from "../context/UserContext.jsx";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const { setUser, setIsLoggedIn } = useContext(UserContext);

    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("Student");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(prev => !prev);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    const changeHandler = (ev) => {
        const { name, value } = ev.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const signupUser = (ev) => {

        ev.preventDefault();

        if (!formData.fName || !formData.lName || !formData.email || !formData.password || !formData.confirmPassword) {
            return toast.error("Please fill in all the required fields");
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Password and Confirm Password do not match.");
        }

        localStorage.setItem("user", JSON.stringify(formData));
        setIsLoggedIn(true);
        toast.success("User is registered successfully.");
        navigate("/");
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gray-900 text-white px-4">
            <div className="flex flex-col md:flex-row w-full max-w-6xl gap-x-16 bg-gray-900">

                {/* Left Part */}
                <div className="w-full md:w-[55%] px-6 md:px-10 py-10 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-2">
                        Join the millions learning to code with <span className="text-indigo-400">StudyNotion</span> for free
                    </h2>
                    <p className="text-gray-400 mb-1">Build skills for today, tomorrow, and beyond</p>
                    <i className="text-indigo-300 mb-6">Education to future-proof your career</i>

                    {/* Role toggle */}
                    <div className="flex space-x-4 mb-6">
                        <span
                            className={`px-4 py-1 rounded border cursor-pointer transition ${role === "Student"
                                ? "bg-indigo-500 text-white border-indigo-500"
                                : "bg-gray-800 text-gray-300 border-gray-600 hover:border-indigo-500"
                                }`}
                            onClick={() => setRole("Student")}
                        >
                            Student
                        </span>
                        <span
                            className={`px-4 py-1 rounded border cursor-pointer transition ${role === "Instructor"
                                ? "bg-indigo-500 text-white border-indigo-500"
                                : "bg-gray-800 text-gray-300 border-gray-600 hover:border-indigo-500"
                                }`}
                            onClick={() => setRole("Instructor")}
                        >
                            Instructor
                        </span>
                    </div>


                    {/* Form */}
                    <form onSubmit={signupUser} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label htmlFor="fName" className="block mb-1 text-sm">First Name<sup className="text-red-500">*</sup></label>
                                <input
                                    type="text"
                                    id="fName"
                                    name="fName"
                                    value={formData.fName}
                                    onChange={changeHandler}
                                    placeholder="Enter first name"
                                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lName" className="block mb-1 text-sm">Last Name<sup className="text-red-500">*</sup></label>
                                <input
                                    type="text"
                                    id="lName"
                                    name="lName"
                                    value={formData.lName}
                                    onChange={changeHandler}
                                    placeholder="Enter last name"
                                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm">Email Address<sup className="text-red-500">*</sup></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={changeHandler}
                                placeholder="Enter email address"
                                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <label htmlFor="password" className="block mb-1 text-sm">Create Password<sup className="text-red-500">*</sup></label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={changeHandler}
                                    placeholder="Enter Password"
                                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500"
                                />
                                <span onClick={toggleShowPassword} className="absolute right-3 top-9 cursor-pointer text-gray-400">
                                    {
                                        showPassword ? <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                        </> : <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        </>
                                    }
                                </span>
                            </div>

                            <div className="flex-1 relative">
                                <label htmlFor="confirmPassword" className="block mb-1 text-sm">Confirm Password<sup className="text-red-500">*</sup></label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={changeHandler}
                                    placeholder="Confirm Password"
                                    className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 focus:ring-1 focus:ring-indigo-500"
                                />
                                <span onClick={toggleShowConfirmPassword} className="absolute right-3 top-9 cursor-pointer text-gray-400">
                                    {
                                        showConfirmPassword ? <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                        </> : <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        </>
                                    }
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 rounded font-semibold transition">
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center text-gray-400">
                        <div className="flex items-center justify-center gap-4">
                            <hr className="w-1/5 border-gray-600" />
                            <span>OR</span>
                            <hr className="w-1/5 border-gray-600" />
                        </div>

                        <button className="mt-6 w-full flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 px-4 py-2 rounded font-semibold transition">
                            <img src="/google.png" alt="Google" className="w-5 h-5" />
                            <span className="text-sm font-semibold">Sign in with Google</span>
                        </button>
                    </div>
                </div>

                {/* Right Part */}
                <div className="hidden md:flex w-full md:w-[45%] relative items-center justify-center">
                    {/* Background frame image behind the cover */}
                    <img
                        src="/frame.png"
                        alt="Frame background"
                        className="absolute max-w-[80%] object-contain z-0"
                    />
                    {/* Cover image on top */}
                    <img
                        src="/signup.webp"
                        alt="Signup visual"
                        className="relative z-10 max-w-[70%] object-contain"
                    />
                </div>
            </div>
        </div>
    );

};

export default Signup;
