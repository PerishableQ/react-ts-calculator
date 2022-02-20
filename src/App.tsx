import { useState } from "react";

import Buttons from "./components/Buttons";
import Display from "./components/Display";

import { handleNumberClick, handleOperatorClick } from "./utils";

import { IState } from "./interfaces";

import "./App.css";

const App = () => {
	const [state, setState] = useState<IState>({
		inputFormula: "",
		inputResult: ""
	});

	const handleClick = (event: React.MouseEvent) => {
		const keyPressed = (event.target as HTMLInputElement).innerText;

		if (isNaN(Number(keyPressed))) {
			return handleOperatorClick(keyPressed, state, setState);
		} else {
			return handleNumberClick(keyPressed, state, setState);
		}
	};

	return (
		<section className="app">
			<Display formula={state.inputFormula} result={state.inputResult} />
			<Buttons targetButton={handleClick} />
		</section>
	);
};

export default App;
