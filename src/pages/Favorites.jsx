import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./Favorites.css";

const Favorites = ({ isLogged, setIsLogged }) => {
	const [favComics, setFavComics] = useState([]);
	const [favCharacters, setFavCharacters] = useState([]);
	const [dataComics, setDataComics] = useState([]);
	const [dataCharacters, setDataCharacters] = useState([]);

	const fetchData = async () => {
		const cookie = Cookies.get("token");
		try {
			const response = await axios.get(`https://site--marvel-back--default-free-project--emel-l758.code.run:8080/favorites`, {
				headers: {
					Authorization: `Bearer ${cookie}`,
				},
			});
			setFavComics(response.data.comics);
			setFavCharacters(response.data.characters);
		} catch (error) {
			console.log("erreur serveur");
		}
	};


	// J'appelle le back avec un .map sur les routes /comic/id et character/id  // A REVOIR
	const addFavData = async (type, ids) => {
		const responseArray = await Promise.all(
			ids.map((id) =>
				axios
					.get(`https://site--marvel-back--default-free-project--emel-l758.code.run:8080/${type}/${id}`)
					.then((response) => response.data)
			)
		);

		if (type === "comic") {
			setDataComics(responseArray);
		} else if (type === "character") {
			setDataCharacters(responseArray);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (favComics.length > 0 || favCharacters.length > 0) {
			addFavData("comic", favComics);
			addFavData("character", favCharacters);
		}
	}, [favComics, favCharacters]);

	return isLogged ? (
		<main className="fav-page">
			<div>
				<h2>Comics</h2>
				<div className="comics-list">
					{dataComics.map((element) => (
						<div key={element._id} className="comics-card">
							<div className="comics-card-image">
								<img
									src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
									alt=""
								/>
							</div>
							<div className="comics-card-content">
								<p>{element.title}</p>
								<p>{element.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<div>
				<h2>Characters</h2>
				<div className="characters-list">
					{dataCharacters.map((element) => (
						<div key={element._id} className="characters-card">
							<div className="characters-card-image">
								<img
									src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
									alt=""
								/>
							</div>
							<div className="characters-card-content">
								<h3>{element.name}</h3>
								<p>{element.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	) : (
		<Navigate to="/login" />
	);
};

export default Favorites;
