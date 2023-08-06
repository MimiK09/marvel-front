import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const Signup = ({ isLogged, setIsLogged }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorSubmit, setErrorSubmit] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (username && email && password) {
			setErrorSubmit("");

			try {
				const sentData = await axios.post("https://site--marvel-back--d4x522rwzwfd.code.run/signup", {
					username,
					email,
					password,
				});

				if (sentData.data.token) {
					const token = sentData.data.token;
					// Sauvegarde du token dans les cookies
					Cookies.set("token", token, { expires: 7 });
					// je réinitialise data
					setUsername("");
					setEmail("");
					setPassword("");
					setIsLogged(true);
					navigate("/");
				}
			} catch (error) {
				setErrorSubmit(error.response.data.message);
			}
		} else {
			setErrorSubmit("Datas are missing");
		}
	};

	return (
		<main className="log-pages">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
					value={email}
					placeholder="Put your email"
				></input>
				<input
					type="text"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
					value={username}
					placeholder="Put your username"
				></input>
				<input
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					value={password}
					placeholder="Put your password"
				></input>
				<button>Sign Up</button>
			</form>
			{errorSubmit ? <p className="error-message">{errorSubmit}</p> : <></>}
			<button className="link">
				<Link to="/login">
					<p>Already have an account ? Let's go to Log in</p>
				</Link>
			</button>
		</main>
	);
};

export default Signup;
