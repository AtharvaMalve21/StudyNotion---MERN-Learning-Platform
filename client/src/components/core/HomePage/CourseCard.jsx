import React from "react";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import { motion } from "framer-motion";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
    const isActive = currentCard === cardData?.heading;

    return (
        <motion.div
            onClick={() => setCurrentCard(cardData?.heading)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`w-[360px] lg:w-[30%] h-[300px] cursor-pointer rounded-xl overflow-hidden transition-all duration-300 
        ${isActive
                    ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50 scale-[1.02] text-richblack-900"
                    : "bg-richblack-800 hover:bg-richblack-700 text-richblack-25"}
      `}
        >
            {/* Top Content */}
            <div className="h-[80%] p-6 border-b-2 border-dashed border-richblack-400 flex flex-col gap-4">
                <h2 className={`text-[20px] font-bold ${isActive ? "text-richblack-900" : "text-richblack-5"}`}>
                    {cardData?.heading}
                </h2>
                <p className={`text-[15px] leading-relaxed ${isActive ? "text-richblack-600" : "text-richblack-400"}`}>
                    {cardData?.description}
                </p>
            </div>

            {/* Bottom Info Bar */}
            <div
                className={`flex items-center justify-between px-6 py-3 text-[15px] font-medium 
        ${isActive ? "text-blue-500" : "text-richblack-300"}`}
            >
                <div className="flex items-center gap-2">
                    <HiUsers />
                    <span>{cardData?.level}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ImTree />
                    <span>{cardData?.lessionNumber} Lesson{cardData?.lessionNumber > 1 ? "s" : ""}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
