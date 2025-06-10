import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Body = () => {
	const userData = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchUser = async () => {
		if (userData) return;
		try {
			const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true })
			dispatch(addUser(res.data));
		} catch (err) {
			if (err.status === 401) {
				navigate("/login")
			}
			console.error(err)
		}
	};

	useEffect(() => {
		fetchUser();
	},[]);

	return (
		<div className="min-h-screen flex flex-col">
			<Header />

			<main className="flex-grow">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default Body;
