import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Characters.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faMagnifyingGlass,
	faSpinner,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faSpinner, faStar);

const Characters = ({ isLogged, setIsLogged }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [dataCharacters, setDataCharacters] = useState([]);
	const [searchKeyWord, setSearchKeyWord] = useState("");
	const [skip, setSkip] = useState(0);
	const limit = 100;
	const [pageNumber, setPageNumber] = useState(1);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/characters?name=${searchKeyWord}&skip=${skip}&limit=${limit}`
			);
			setDataCharacters(response.data.results);
			setIsLoading(false);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchData();
	}, [searchKeyWord, skip]);

	const handleClick = (element) => {
		navigate(`/comics/${element._id}`);
	};

	const handlePageChange = (number, string) => {
		setSkip((number - 1) * limit);
		if (string === "minus" && pageNumber > 1) {
			setPageNumber((prevPage) => prevPage - 1);
		} else if (string === "plus" && dataCharacters.length >= limit) {
			setPageNumber((prevPage) => prevPage + 1);
		}
	};

	const addToFavorites = async (id) => {
		const cookie = Cookies.get("token");
		console.log("cookie", cookie, "id", id);
		const sentData = await axios.post(
			"http://localhost:3000/favorites/add",
			{ type: "character", id },
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
		<main className="characters-page">
			<div className="searchBar">
				<FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
				<form
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Looking for a character"
						value={searchKeyWord}
						onChange={(event) => {
							setSearchKeyWord(event.target.value);
							setSkip(0);
						}}
					/>
				</form>
			</div>
			<h2>Characters</h2>
			<div className="characters-list">
				{dataCharacters.map((element) => {
					return (
						<div key={element._id} className="characters-card">
							<div
								className="characters-card-image"
								onClick={() => {
									handleClick(element);
								}}
							>
								<img
									src={
										element.thumbnail.path + "." + element.thumbnail.extension
									}
									alt=""
									onClick={() => {
										handleClick(element);
									}}
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
							<div className="characters-card-content">
								<h3>{element.name}</h3>
								<p>{element.description}</p>
							</div>
						</div>
					);
				})}
			</div>
			<div className="pagination">
				{pageNumber > 1 ? (
					<button onClick={() => handlePageChange(pageNumber - 1, "minus")}>
						Précédent
					</button>
				) : (
					<></>
				)}
				<p>Page : {pageNumber}</p>
				{dataCharacters.length >= limit && (
					<button onClick={() => handlePageChange(pageNumber + 1, "plus")}>
						Suivant
					</button>
				)}
			</div>
		</main>
	);
};

export default Characters;
