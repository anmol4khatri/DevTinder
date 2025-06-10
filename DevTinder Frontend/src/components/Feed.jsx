import { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {

    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            if(feed?.length > 0) return;

            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data?.data));
        } catch (err) {

        }
    };

    useEffect(() => {
        getFeed();
    }, [])

    return (
        
        feed && (<div>
            {feed?.map((user) => (<UserCard key={user._id} user={user}/>))}
        </div>)
    );
};

export default Feed;