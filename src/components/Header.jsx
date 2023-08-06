// import axios from "axios";
import { useState, useEffect } from "react";
import "./Header.css";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faMagnifyingGlass,
	faSpinner,
	faStar,
	faBars,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faSpinner, faStar, faBars);

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Header = ({ isLogged, setIsLogged }) => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	return (
		<header>
			<div className="little-screen">
				<Link to="/">
					<div className="header-logo">
						<img
							src="https://res.cloudinary.com/lereacteur-apollo/image/upload/v1582097342/react-new-exercices/Marvel/langfr-1920px-MarvelLogo.svg_uw9pi8.png"
							alt="logo-marvel"
						/>
					</div>
				</Link>
				<div className="menu-burger" onClick={toggleMobileMenu}>
					<FontAwesomeIcon icon={faBars} />
				</div>
			</div>
			{showMobileMenu ? ( // Affiche le menu si showMobileMenu est vrai
				<div className="mobile-menu">
					<Link to="/characters">
						<p>Characters</p>
					</Link>
					<Link to="/comics">
						<p>Comics</p>
					</Link>

					<Link to="/favorites">
						<p>Favorites</p>
					</Link>
					{isLogged ? (
						<></>
					) : (
						<Link to="/login">
							<p>Log In</p>
						</Link>
					)}
					{isLogged ? (
						<></>
					) : (
						<Link to="/signup">
							<p>Sign up</p>
						</Link>
					)}
					{isLogged ? (
						<p
							onClick={() => {
								setIsLogged(false);
								Cookies.remove("token");
							}}
						>
							Disconnect
						</p>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
			<div className="container large-screen">
				<Link to="/">
					<div className="header-logo">
						<img
							src="https://res.cloudinary.com/lereacteur-apollo/image/upload/v1582097342/react-new-exercices/Marvel/langfr-1920px-MarvelLogo.svg_uw9pi8.png"
							alt="logo-marvel"
						/>
					</div>
				</Link>
				<div>
					<Link to="/characters">
						<p>Characters</p>
					</Link>
					<Link to="/comics">
						<p>Comics</p>
					</Link>
				</div>
				<div>
					<Link to="/favorites">
						<p>Favorites</p>
					</Link>
					{isLogged ? (
						<></>
					) : (
						<Link to="/login">
							<p>Log In</p>
						</Link>
					)}
					{isLogged ? (
						<></>
					) : (
						<Link to="/signup">
							<p>Sign up</p>
						</Link>
					)}
					{isLogged ? (
						<p
							onClick={() => {
								setIsLogged(false);
								Cookies.remove("token");
							}}
						>
							Disconnect
						</p>
					) : (
						<></>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
