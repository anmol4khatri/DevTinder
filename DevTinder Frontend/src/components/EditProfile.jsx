import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [about, setAbout] = useState(user?.about)

    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("") //clear errors, if any
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, age, gender, photoUrl, about
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));

            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000)
        } catch (err) {
            setError(err?.response?.data);
        }
    };

    return (
        <div className="flex flex-col md:flex-row mt-10 justify-center gap-4 md:gap-12 items-center md:items-end">
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4 md:p-8">
                    <legend className="fieldset-legend">Edit Profile</legend>

                    <label className="label">First Name</label>
                    <input className="input" placeholder="First Name"
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label className="label">Last Name</label>
                    <input className="input" placeholder="Last Name"
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label className="label">Age</label>
                    <input className="input" placeholder="Age"
                        value={age} onChange={(e) => setAge(e.target.value)} />

                    <label className="label">Gender</label>
                    <input className="input" placeholder="Gender"
                        value={gender} onChange={(e) => setGender(e.target.value)} />

                    <label className="label">Photo URL</label>
                    <input className="input" placeholder="Photo URl"
                        value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

                    <label className="label">About</label>
                    <input className="input" placeholder="About"
                        value={about} onChange={(e) => setAbout(e.target.value)} />

                    <p className="text-red-500">{error}</p>
                    <button className="btn btn-primary mt-4" onClick={saveProfile}>Save Profile</button>
                </fieldset>
            </div>
            <div className="w-full md:w-xs">
                <h3 className="font-semibold">Preview</h3>
                <UserCard user={{ firstName, lastName, age, gender, photoUrl, about }} />
            </div>
            {showToast && <div className="toast toast-top toast-end mt-28 mr-6">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
        </div>
    );
};

export default EditProfile;