import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faMagnifyingGlass,
	faSpinner,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faSpinner, faStar);

import "./Comics.css";

const Comics = ({ isLogged, setIsLogged }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [dataComics, setDataComics] = useState([]);
	const [searchKeyWord, setSearchKeyWord] = useState("");
	const [added, setAdded] = useState(false);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/comics?title=${searchKeyWord}`
			);
			setDataComics(response.data.results);
			setIsLoading(false);
		} catch (error) {
			console.log(error.response); // contrairement au error.message d'express
		}
	};

	useEffect(() => {
		fetchData();
	}, [searchKeyWord]);

	const addToFavorites = async (id) => {
		console.log("test id", id);
		const cookie = Cookies.get("token");

		console.log("cookie", cookie, "id", id);
		const sentData = await axios.post(
			"http://localhost:3000/favorites/add",
			{ type: "comic", id },
			{
				headers: {
					Authorization: `Bearer ${cookie}`,
				},
			}
		);
		console.log(sentData);
	};

	return isLoading ? (
		<main className="isLoading">
			<FontAwesomeIcon icon={faSpinner} className="icon" />
			<p>Chargement</p>
		</main>
	) : (
		<main className="comics-page">
			<div className="searchBar">
				<FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
				<form
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Looking for a comic"
						value={searchKeyWord}
						onChange={(event) => {
							setSearchKeyWord(event.target.value);
						}}
					/>
				</form>
			</div>
			<h2>Comics</h2>
			<div className="comics-list">
				{dataComics.map((element) => {
					return (
						<div key={element._id} className="comics-card">
							<div className="comics-card-image">
								<img
									src={
										element.thumbnail.path + "." + element.thumbnail.extension
									}
									alt=""
								/>
							</div>
							{isLogged ? (
								<div
									className="fav-icon"
									onClick={() => {
										addToFavorites(element._id);
									}}
								>
									<FontAwesomeIcon icon={faStar} className="icon-fa" />
								</div>
							) : (
								<Link to="/signup">
									<div
										className="fav-icon"
										onClick={() => {
											addToFavorites(element._id);
										}}
									>
										<FontAwesomeIcon icon={faStar} className="icon-fa" />
									</div>
								</Link>
							)}
							<div className="comics-card-content">
								<p>{element.title}</p>
								<p>{element.description}</p>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default Comics;
