import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-[80vh] bg-gray-900 text-white px-6 py-12">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-gray-300 mb-8">
                    We'd love to hear from you! Fill out the form below or email us directly at
                    <span className="text-white font-medium"> support@studynotion.io</span>
                </p>

                <form className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Your Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Your Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Message</label>
                        <textarea
                            className="w-full px-4 py-2 h-32 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
