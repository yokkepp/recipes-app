import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
	const APP_ID = "d48235b4";
	const APP_KEY = "fa7974443c9d31680f4eef75be8da29a";

	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	}, []);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("banana");
	const [recipes, setRecipes] = useState([]);

	const getRecipes = async () => {
		const response = await fetch(
			`https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`
		);
		const data = await response.json();
		setRecipes(data.hits);
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
				<input
					ref={inputRef}
					type='text'
					value={search}
					onChange={updateSearch}
				/>
				<button type='submit'>検索</button>
			</form>
			{recipes.map((recipe) => (
				<Recipe
					key={recipe.recipe.key}
					title={recipe.recipe.label}
					calories={recipe.recipe.calories}
					image={recipe.recipe.image}
					ingredients={recipe.recipe.ingredients}
				/>
			))}
		</div>
	);
}

export default App;
