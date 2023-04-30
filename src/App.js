import React, { useState, useEffect } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
	const APP_ID = "d48235b4";
	const APP_KEY = "fa7974443c9d31680f4eef75be8da29a";
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("banana");
	const [recipes, setRecipes] = useState([]);

	const getRecipes = async () => {
		const response = await fetch(
			`https://api.edamam.com/search?q="banana"&app_id=${APP_ID}&app_key=${APP_KEY}`
		);
		const data = await response.json();
		console.log("data:", data);
		// setRecipes(data.hits);
		setRecipes([
			{
				key: "key",
				title: "title",
				calories: "calories",
				image: "image",
				ingredients: "ingredients",
			},
		]);
		console.log(data.hits);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
		setSearch("");
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		getRecipes();
	}, [query]);

	return (
		<div className='App'>
			<form onSubmit={getSearch}>
				<input type='text' value={search} onChange={updateSearch} />
				<button type='submit'>検索</button>
				<p>{recipes}</p>
			</form>
			<div>
				{recipes.map((recipe) => (
					<Recipe
						key={recipe.label}
						title={recipe.label}
						calories={recipe.calories}
						image={recipe.image}
						ingredients={recipe.ingredients}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
