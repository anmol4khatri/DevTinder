import { useState } from "react";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [gender, setGender] = useState(user?.gender);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [about, setAbout] = useState(user?.about)

    return (
        <div className="flex mt-10 justify-center gap-12 items-end">
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-8">
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

                    <button className="btn btn-primary mt-4">Login</button>
                </fieldset>
            </div>
            <div className="w-xs">
                <h3 className="font-semibold">Preview</h3>
                <UserCard user={{firstName, lastName, age, gender, photoUrl, about}}/>
            </div>
        </div>
    );
};

export default EditProfile;