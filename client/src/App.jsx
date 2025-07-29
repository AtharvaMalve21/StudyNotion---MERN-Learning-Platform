import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Error from './pages/404.jsx';


const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
