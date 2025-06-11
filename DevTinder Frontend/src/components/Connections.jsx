import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data));
        } catch (error) {
            console.error("Failed to fetch connections", error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections.length === 0) {
        return <h1 className="font-bold text-3xl text-center mt-6">No connections found</h1>;
    }

    return (
        <div>
            <h1 className="font-bold text-3xl text-center mt-6 mb-8">Connections</h1>

            {connections.map((connection, index) => {
                const { _id, firstName, lastName, age, gender, about, photoUrl } = connection;
                return (
                    <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
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
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;
