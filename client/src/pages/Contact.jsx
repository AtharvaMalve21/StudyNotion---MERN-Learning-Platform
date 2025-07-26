import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from '../components/Loader.jsx';

const Contact = () => {

    const [loading, setLoading] = useState(false);

    const URI = import.meta.env.VITE_BACKEND_URI;

    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
        }
    )




    const changeHandler = (ev) => {
        let { name, value } = ev.target;

        setFormData((prevFormData) => (
            {
                ...prevFormData,
                [name]: value
            }
        ))
    };

    const sendMessage = async (ev) => {
        try {
            ev.preventDefault();

            setLoading(true);

            const { data } = await axios.post(URI + "/api/message/send", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (data.success) {
                toast.success(data.message);
            }

        } catch (err) {
            toast.error(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] bg-gray-900 text-white px-6 py-12">
            {
                loading && <Loader />
            }
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-gray-300 mb-8">
                    We'd love to hear from you! Fill out the form below or email us directly at
                    <span className="text-white font-medium"> support@studynotion.io</span>
                </p>

                <form onSubmit={sendMessage} className="space-y-6">
                    <div className='flex items-center justify-between gap-10'>
                        <div>
                            <label id='firstName' className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
                            <input
                                type="text"
                                name='firstName'
                                id='firstName'
                                value={formData.firstName}
                                onChange={changeHandler}
                                className="w-[250px] px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                                placeholder="Enter first name"
                            />

                        </div>
                        <div>
                            <label id='lastName' className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
                            <input
                                type="text"
                                name='lastName'
                                id='lastName'
                                value={formData.lastName}
                                onChange={changeHandler}
                                className="w-[350px] px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                                placeholder="Enter last name"
                            />

                        </div>

                    </div>

                    <div>
                        <label id='email' className="block mb-2 text-sm font-medium text-gray-300">Your Email</label>
                        <input
                            type="email"
                            name='email'
                            id='email'
                            value={formData.email}
                            onChange={changeHandler}
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label id='phone' className="block mb-2 text-sm font-medium text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            name='phone'
                            id='phone'
                            value={formData.phone}
                            onChange={changeHandler}
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-500"
                            placeholder="000000000"
                        />
                    </div>

                    <div>
                        <label id='message' className="block mb-2 text-sm font-medium text-gray-300">Message</label>
                        <textarea
                            name='message'
                            id='message'
                            value={formData.message}
                            onChange={changeHandler}
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
