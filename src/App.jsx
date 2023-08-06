import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Comics from "./pages/comics";
import Characters from "./pages/characters";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import ComicsForCharacterId from "./pages/ComicsForCharacterId";
import Footer from "./components/Footer";
import { useState } from "react";

function App() {
	const [isLogged, setIsLogged] = useState(false);

	return (
		<Router>
			<Header isLogged={isLogged} setIsLogged={setIsLogged} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/characters"
					element={<Characters isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route path="/comics/:characterId" element={<ComicsForCharacterId />} />
				<Route
					path="/comics"
					element={<Comics isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/login"
					element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/signup"
					element={<Signup isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
				<Route
					path="/favorites"
					element={<Favorites isLogged={isLogged} setIsLogged={setIsLogged} />}
				/>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
