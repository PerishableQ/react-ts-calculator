import * as React from "react";

interface IButtonsProps {
	targetButton: Function;
}

const Buttons: React.FunctionComponent<IButtonsProps> = ({ targetButton }): JSX.Element => {
	return (
		<div className="buttons" onClick={event => targetButton(event)}>
			<button className="button operator">x²</button>
			<button className="button operator">CE</button>
			<button className="button operator">C</button>
			<button className="button operator">Delete</button>

			<button className="button parenthesis">(</button>
			<button className="button parenthesis">)</button>
			<button className="button operator">√</button>
			<button className="button operator">/</button>

			<button className="button number">7</button>
			<button className="button number">8</button>
			<button className="button number">9</button>
			<button className="button operator">*</button>

			<button className="button number">4</button>
			<button className="button number">5</button>
			<button className="button number">6</button>
			<button className="button operator">-</button>

			<button className="button number">1</button>
			<button className="button number">2</button>
			<button className="button number">3</button>
			<button className="button operator">+</button>

			<button className="button operator reset">+/-</button>
			<button className="button number">0</button>
			<button className="button operator reset">.</button>
			<button className="button operator">=</button>
		</div>
	);
};

export default Buttons;
