import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-900 text-white py-10 px-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.fName} {user?.lName} 👋
        </h1>
        <p className="text-gray-400 mb-6">
          We're excited to have you on board. Here's a quick summary of your profile:
        </p>

        <div className="bg-gray-700 p-6 rounded-lg space-y-4">
          <div className="flex flex-col md:flex-row justify-between">
            <span className="text-gray-300 font-medium">Full Name:</span>
            <span className="text-white">{user?.fName} {user?.lName}</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <span className="text-gray-300 font-medium">Email Address:</span>
            <span className="text-white">{user?.email}</span>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-400">
          🎓 Keep learning and building. Your journey to becoming a developer starts now!
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
