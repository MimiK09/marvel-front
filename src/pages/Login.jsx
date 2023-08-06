import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

const Login = ({ isLogged, setIsLogged }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorSubmit, setErrorSubmit] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (email && password) {
			setErrorSubmit("");

			try {
				const sentData = await axios.post("https://site--marvel-back--default-free-project--emel-l758.code.run:8080/login", {
					email,
					password,
				});

				// Sauvegarde du token dans les cookies
				if (sentData.data.token) {
					console.log("je passe avant otken");
					const token = sentData.data.token;
					Cookies.set("token", token, { expires: 7 }); // je réinitialise data
					setEmail("");
					setPassword("");
					setIsLogged(true);
					setErrorSubmit("You're logged !");
					navigate("/");
				} else {
					setErrorSubmit(sentData.data.message);
				}
			} catch (error) {
				setErrorSubmit("server error");
			}
		} else {
			setErrorSubmit("Datas are missing");
		}
	};

	return (
		<main className="log-pages">
			<h2>Log In</h2>
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
					type="password"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					value={password}
					placeholder="Put your password"
				></input>
				<button>Log in</button>
			</form>
			{errorSubmit ? <p className="error-message">{errorSubmit}</p> : <></>}
			<button className="link">
				<Link to="/singup">
					<p>Already have an account ? Let's go to Sign Up</p>
				</Link>
			</button>
		</main>
	);
};

export default Login;
