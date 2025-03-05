import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const res = await axios.post(
                BASE_URL + "login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true },
            );
            dispatch(addUser(res.data.data));
            return navigate("/");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    const handleSignUp = async () => {
        setError("");
        try {
            const res = await axios.post(
                BASE_URL + "signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true },
            );
            dispatch(addUser(res.data.data));
            return navigate("/profile");
        } catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 animate-gradient-x">
            <div className="card bg-gray-800 w-96 shadow-2xl rounded-lg transform transition-all hover:scale-105">
                <div className="card-body p-8">
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">
                        {isLoginForm ? "Welcome Back!" : "Create Account"}
                    </h2>
                    <div className="space-y-4">
                        {!isLoginForm && (
                            <>
                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-300">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            setError("");
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            setError("");
                                        }}
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-300">
                                Email ID
                            </label>
                            <input
                                type="email"
                                value={emailId}
                                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => {
                                    setEmailId(e.target.value);
                                    setError("");
                                }}
                            />
                        </div>
                        <div className="form-group relative">
                            <label className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                            />
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-400 hover:text-purple-500" />
                                ) : (
                                    <FaEye className="text-gray-400 hover:text-purple-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm mt-4 text-center">
                            {error}
                        </p>
                    )}
                    <div className="mt-6">
                        <button
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
                            onClick={isLoginForm ? handleLogin : handleSignUp}>
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>
                    <p
                        className="mt-4 text-center text-sm text-gray-400 cursor-pointer hover:text-purple-500 transition-all"
                        onClick={() => setIsLoginForm((value) => !value)}>
                        {isLoginForm
                            ? "New User? Sign Up Here"
                            : "Already have an account? Login Here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
