import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, EditProfile }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();
    console.log(user);

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "request/send/" + status + "/" + userId,
                {},
                { withCredentials: true },
            );
            dispatch(removeUserFromFeed(userId));
        } catch (err) {}
    };

    return (
        <div className="relative w-80 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden text-white">
            <figure className="relative">
                <img
                    src={photoUrl}
                    alt="photo"
                    className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                    <h2 className="text-xl font-bold">
                        {firstName} {lastName}
                    </h2>
                </div>
            </figure>
            <div className="p-5">
                {age && gender && (
                    <p className="text-gray-300 text-sm">
                        {age}, {gender}
                    </p>
                )}
                <p className="mt-2 text-gray-200 text-sm">{about}</p>
                {!EditProfile && (
                    <div className="flex justify-around mt-4">
                        <button
                            className="bg-red-700 hover:bg-red-900 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 transition"
                            onClick={() => handleSendRequest("ignored", _id)}>
                            ❌ Ignore
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 transition"
                            onClick={() =>
                                handleSendRequest("interested", _id)
                            }>
                            💚 Interested
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default UserCard;
