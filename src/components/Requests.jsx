import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(
                `${BASE_URL}request/review/${status}/${_id}`,
                {},
                { withCredentials: true },
            );
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error("Error processing request", err);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}user/request/received`, {
                withCredentials: true,
            });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error("Error fetching requests", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return null;

    if (requests.length === 0)
        return (
            <h1 className="flex justify-center text-gray-600 text-xl my-10 font-semibold">
                No Connection Requests Found
            </h1>
        );

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 flex justify-center py-10">
            <div className="max-w-3xl w-full bg-gray-800 shadow-2xl rounded-lg p-6 text-white min-h-[400px]">
                <h1 className="text-3xl font-bold text-white mb-6 text-center border-b border-gray-600 pb-4">
                    Connection Requests
                </h1>
                {requests.map((request) => {
                    const {
                        _id,
                        firstName,
                        lastName,
                        photoUrl,
                        age,
                        gender,
                        about,
                    } = request.fromUserId;

                    return (
                        <div
                            key={_id}
                            className="flex items-center justify-between p-4 mb-4 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <div className="flex items-center space-x-4">
                                <img
                                    alt="User Avatar"
                                    className="w-16 h-16 rounded-full border-2 border-gray-500"
                                    src={photoUrl}
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        {firstName + " " + lastName}
                                    </h2>
                                    {age && gender && (
                                        <p className="text-gray-300 text-sm">
                                            {age}, {gender}
                                        </p>
                                    )}
                                    <p className="text-gray-400 text-sm mt-1">
                                        {about}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    className="px-4 py-2 text-red-400 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition flex items-center space-x-2"
                                    onClick={() =>
                                        reviewRequest("rejected", request._id)
                                    }>
                                    <FaTimes /> <span>Reject</span>
                                </button>
                                <button
                                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                                    onClick={() =>
                                        reviewRequest("accepted", request._id)
                                    }>
                                    <FaCheck /> <span>Accept</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Requests;
