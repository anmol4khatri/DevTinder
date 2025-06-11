import { Link } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Header = () => {

    const user = useSelector((store) => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + "/logout", null, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm p-4">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            <div className="flex gap-2">
                {user && <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to={"/Profile"} className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><Link to={"/Connections"}>Connections</Link></li>
                        <li><Link to={"/Requests"}>Requests</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    );
};

export default Header;