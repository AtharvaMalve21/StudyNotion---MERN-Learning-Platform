import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Home = () => {

    const { user } = useContext(UserContext);

    return (
        <div className="min-h-[calc(100vh-72px)] bg-gray-900 text-white flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                    Welcome to <span className="text-indigo-500">StudyNotion</span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl mb-8">
                    Learn, build, and grow your skills with the ultimate platform for coding education.
                    Whether you're just starting out or advancing your tech career, StudyNotion is here to help.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to={user ? "/" : "/login"}>
                        <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded text-white font-semibold transition">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/about">
                        <button className="border border-gray-600 px-6 py-3 rounded text-gray-300 hover:bg-gray-800 transition">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
