import axios from "axios";
import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ComicsForCharacterId.css";

const ComicsForCharacterId = () => {
	const { characterId } = useParams();

	const [isLoading, setIsLoading] = useState(true);
	const [dataComicsForCharacter, setDataComicsForCharacter] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://site--marvel-back--d4x522rwzwfd.code.run/comics/${characterId}`
			);

			setDataComicsForCharacter(response.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error.response); // contrairement au error.message d'express
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return isLoading ? (
		<main>
			<p>Chargement</p>
		</main>
	) : (
		<main className="comics-characterId-page">
			<div className="comics-characterId-list">
				<div
					key={dataComicsForCharacter._id}
					className="comics-characterId-character-card"
				>
					<div className="comics-characterId-character-image">
						<img
							src={
								dataComicsForCharacter.thumbnail.path +
								"." +
								dataComicsForCharacter.thumbnail.extension
							}
							alt=""
						/>
					</div>
					<div className="comics-characterId-character-content">
						<h3>{dataComicsForCharacter.name}</h3>
					</div>
				</div>
				<h2>Comics</h2>
				<div className="comics-list">
					{dataComicsForCharacter.comics.map((newElement) => {
						return (
							<div key={newElement._id} className="comics-card">
								<div className="comics-card-image img">
									<img
										src={
											newElement.thumbnail.path +
											"." +
											newElement.thumbnail.extension
										}
										alt=""
									/>
								</div>
								<div className="comics-card-content">
									<p>{newElement.title}</p>
									<p>{newElement.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</main>
	);
};

export default ComicsForCharacterId;
