import { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import contactPageBg from '../assets/contactPageBg.jpg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log form data to console (optional)
        try {
            // Make POST request to the server with the form data
            const response = await fetch('http://localhost:5000/api/contact/saveContact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Check if the response is OK
            if (response.ok) {
                const result = await response.json();
                toast.success(result.message); // Display the success message from the server
                // Reset form data after submission
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                // Handle error from server
                const errorResult = await response.json();
                alert(errorResult.message || 'Failed to submit message.');
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error submitting form:', error);
            alert('Failed to submit message due to an error.');
        }
    };


    return (
        <div className="flex flex-col lg:flex-row items-center bg-[#e5e7eb] p-10 px-4 sm:px-10 lg:px-32 justify-between">
            {/* Left-side image with animation */}
            <motion.div
                className="lg:w-[45%] w-full flex justify-center h-[320px] sm:h-[480px] lg:h-[640px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src={contactPageBg}
                    alt="Side Visual"
                    className="w-full object-cover h-full"
                />
            </motion.div>

            {/* Form Section with animation */}
            <motion.div
                className="lg:w-[45%] w-full p-4 sm:p-8 bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact us</h2>
                <p className="text-gray-600 mb-4">
                    Use this form for all general enquiries. We monitor these responses constantly during working hours. If you are looking to partner with us, please complete the new customer application form instead.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Full Name Input */}
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                FULL NAME <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 transition"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                pattern="[a-zA-Z ]+"
                                oninvalid="this.setCustomValidity('Numbers and Symbols are not allowed')"
                                oninput="this.setCustomValidity('')"
                            />
                        </div>
                        {/* Phone Number Input */}
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                PHONE NUMBER <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your number"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 transition"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{10}"
                                maxlength="10"
                                oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Email Input */}
                        <div className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                EMAIL <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 transition"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            MESSAGE <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            className="w-full p-3 border rounded-md h-24 sm:h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 transition"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    {/* reCAPTCHA & Submit Button */}
                    <div className="flex flex-col space-y-4 mt-4">
                        <div>
                            {/* Placeholder for reCAPTCHA */}
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="recaptcha" className="w-4 h-4" />
                                <label htmlFor="recaptcha" className="text-sm text-gray-600">
                                    I'm not a robot
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
                        >
                            Send Your Message
                        </button>
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default ContactPage;
