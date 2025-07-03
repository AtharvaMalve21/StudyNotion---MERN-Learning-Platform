import React from 'react';

const About = () => {
    return (
        <div className="min-h-[80vh] bg-gray-900 text-white px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">About StudyNotion</h1>
                <p className="text-gray-300 leading-relaxed mb-4">
                    StudyNotion is a modern, intuitive note-taking and productivity platform designed
                    for students, creators, and lifelong learners. Inspired by tools like Notion, we aim
                    to offer a clean, distraction-free space to help you organize your ideas, collaborate
                    in real-time, and stay productive.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    Whether you're managing a school project, planning content, or simply capturing
                    your thoughts — StudyNotion helps you stay focused and organized.
                </p>
            </div>
        </div>
    );
};

export default About;
