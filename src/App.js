import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1> React </h1>
				<main>
					<Forecast></Forecast>
				</main>

				<footer>
					By me
			</footer>
			</header>

		</div>
	);
}

export default App;
