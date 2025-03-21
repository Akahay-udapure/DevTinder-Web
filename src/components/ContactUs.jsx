const ContactUs = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 animate-gradient-x">
            <div className="card bg-gray-800 w-96 shadow-2xl rounded-lg transform transition-all hover:scale-105">
                <div className="card-body p-8">
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">
                        Contact Us
                    </h2>
                    <form className="space-y-4">
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-300">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Your message here..."
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500">
                                Send Message
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-400">
                        Or reach out directly at:{" "}
                        <span className="text-purple-500 hover:text-purple-400 cursor-pointer">
                            support@example.com
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
