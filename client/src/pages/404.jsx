import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-richblack-900 px-4 text-center text-white">
            <h1 className="text-6xl font-bold text-richblack-100 mb-4">404</h1>
            <p className="text-2xl font-semibold text-richblack-200 mb-2">Page Not Found</p>
            <p className="text-richblack-400 mb-6 max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/">
                <button className="rounded-md bg-yellow-50 px-6 py-3 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all duration-200">
                    Go back to Home
                </button>
            </Link>
        </div>
    )
}

export default Error
