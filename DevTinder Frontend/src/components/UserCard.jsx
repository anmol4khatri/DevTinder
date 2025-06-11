import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserForFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {

    const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
            if (res.status === 200) {
                dispatch(removeUserForFeed(userId));
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card bg-base-300 w-full md:w-96 shadow-sm">
                <figure>
                    <img
                        className="object-cover"
                        src={photoUrl}
                        alt="profile" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName} {lastName}</h2>
                    <p>{age}, {gender}</p>
                    <p>{about}</p>
                    <div className="card-actions flex flex-col mt-3 ">
                        <button className="btn btn-primary w-1/1 mb-0.5"
                            onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
                        <button className="btn btn-secondary w-1/1"
                            onClick={() => handleSendRequest("intrested", _id)}>Intrested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;