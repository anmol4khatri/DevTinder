import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router"
import { useNavigate } from "react-router";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const signUp = async () => {
        setError("") //clear errors, if any
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName, lastName, emailId, password
            }, { withCredentials: true });
            navigate("/login")
        } catch (err) {
            setError(err?.response?.data);
        }
    };

    return (
        <div className="flex flex-col md:flex-row mt-10 justify-center gap-4 md:gap-12 items-center md:items-end">
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full md:w-xs border p-4 md:p-8">
                    <legend className="fieldset-legend">Sign Up</legend>

                    <label className="label">First Name</label>
                    <input className="input" placeholder="First Name"
                        value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label className="label">Last Name</label>
                    <input className="input" placeholder="Last Name"
                        value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label className="label">Email</label>
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" required
                            value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                    <label className="label">Password</label>
                    <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            minLength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <p className="text-red-500">{error}</p>
                    <button className="btn btn-primary mt-4" onClick={signUp}>Create Account</button>
                    <div><Link to="/Login" className="link link-hover font-semibold">Already have an account? Login</Link></div>

                </fieldset>
            </div>
        </div>
    );
};

export default SignUp;