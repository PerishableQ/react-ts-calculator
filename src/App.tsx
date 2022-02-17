import Buttons from "./components/Buttons";
import Container from "./components/Container";
import Display from "./components/Display";

import { handleNumberClick, handleOperatorClick, useAppState } from "./utils";

import "./App.css";

const App = () => {
	const [state, setState] = useAppState();

	const handleClick = (event: React.MouseEvent) => {
		const keyPressed = (event.target as HTMLInputElement).innerText;

		if (isNaN(Number(keyPressed))) {
			return handleOperatorClick(keyPressed, state, setState);
		} else {
			return handleNumberClick(keyPressed, state, setState);
		}
	};

	return (
		<Container>
			<Display top={state.inputTop} result={state.inputResult} />
			<Buttons targetButton={(event: React.MouseEvent) => handleClick(event)} />
		</Container>
	);
};

export default App;
