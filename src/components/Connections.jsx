import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    if (connections.length === 0)
        return (
            <h1 className="text-center text-2xl text-gray-500">
                No Connections Found
            </h1>
        );

    return (
        <div className="text-center my-10 px-4">
            <h1 className="font-extrabold text-white text-4xl mb-6">
                My Network
            </h1>
            <div className="flex flex-col items-center space-y-6">
                {connections.map(
                    ({
                        _id,
                        firstName,
                        lastName,
                        photoUrl,
                        age,
                        gender,
                        about,
                    }) => (
                        <div
                            key={_id}
                            className="flex items-center bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full max-w-2xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                            <img
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-purple-500 mr-6"
                                src={photoUrl}
                            />
                            <div className="flex-1">
                                <h2 className="font-bold text-xl text-gray-100">
                                    {firstName} {lastName}
                                </h2>
                                {age && gender && (
                                    <p className="text-gray-400 text-sm">
                                        {age}, {gender}
                                    </p>
                                )}
                                <p className="text-gray-300 text-sm mt-1">
                                    {about}
                                </p>
                            </div>
                            <Link to={`/chat/${_id}`} className="ml-4">
                                <button className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all hover:bg-purple-700">
                                    Chat
                                </button>
                            </Link>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default Connections;
