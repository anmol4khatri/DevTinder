import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/"+ requestId, {}, {withCredentials:true});
            if(res.status === 200){
                dispatch(removeRequest(requestId));
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const getRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests", { withCredentials: true });
            dispatch(addRequests(res?.data));
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return <h1 className="font-bold text-3xl text-center mt-6">No requests found</h1>;
    };

    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-6 mb-8">Pending Requests</h1>

            {requests.map((request, index) => {
                const { _id, firstName, lastName, age, gender, about, photoUrl } = request?.fromUserId;
                return (
                    <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="flex w-56 justify-center items-center ml-20">
                            <button className="btn btn-primary mx-2 p-6"
                            onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                            <button className="btn btn-secondary mx-2 p-6"
                            onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;