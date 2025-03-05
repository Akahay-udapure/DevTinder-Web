import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.put(
                BASE_URL + "profile/edit",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                { withCredentials: true },
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-center p-4 bg-gray-900 min-h-screen space-x-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-md text-white">
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Edit Profile
                </h2>
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={firstName}
                                className="input input-bordered w-full bg-gray-700 text-white"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={lastName}
                                className="input input-bordered w-full bg-gray-700 text-white"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300 font-medium">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            value={photoUrl}
                            className="input input-bordered w-full bg-gray-700 text-white"
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-300 font-medium">
                                Age
                            </label>
                            <input
                                type="number"
                                value={age}
                                className="input input-bordered w-full bg-gray-700 text-white"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 font-medium">
                                Gender
                            </label>
                            <select
                                value={gender}
                                className="select select-bordered w-full bg-gray-700 text-white"
                                onChange={(e) => setGender(e.target.value)}>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-300 font-medium">
                            About
                        </label>
                        <textarea
                            value={about}
                            className="textarea textarea-bordered w-full bg-gray-700 text-white"
                            onChange={(e) =>
                                setAbout(e.target.value)
                            }></textarea>
                    </div>
                    {error && (
                        <p className="text-red-500 text-center">{error}</p>
                    )}
                    <button
                        className="btn btn-primary w-full mt-2"
                        onClick={saveProfile}>
                        Save Profile
                    </button>
                </div>
            </div>
            <div className="mt-6 lg:mt-0">
                <UserCard
                    user={{ firstName, lastName, photoUrl, age, gender, about }}
                    EditProfile={true}
                />
            </div>
            {showToast && (
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    Profile saved successfully.
                </div>
            )}
        </div>
    );
};

export default EditProfile;
