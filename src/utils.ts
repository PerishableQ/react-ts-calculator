import { Keys } from "./enums";
import { IState } from "./interfaces";

export const handleNumberClick = (
	keyPressed: string,
	state: IState,
	setState: React.Dispatch<React.SetStateAction<IState>>
) => {
	setState({
		...state,
		inputResult: state.inputResult + keyPressed
	});
};

export const handleOperatorClick = (
	keyPressed: string,
	state: IState,
	setState: React.Dispatch<React.SetStateAction<IState>>
) => {
	switch (keyPressed) {
		case Keys.PLUS:
		case Keys.MINUS:
		case Keys.MULTIPLY:
		case Keys.DIVIDE: {
			setState({
				...state,
				inputFormula: state.inputFormula + state.inputResult + keyPressed,
				inputResult: ""
			});
			break;
		}

		case Keys.EQUALS: {
			const result = calculateResult(state.inputFormula + state.inputResult);

			setState({
				...state,
				inputFormula: state.inputFormula + state.inputResult + keyPressed,
				inputResult: `${result}`
			});
			break;
		}

		case Keys.SQUARE: {
			const result = Math.pow(Number(state.inputResult), 2);

			if (state.inputResult === "") {
				break;
			}

			setState({
				...state,
				inputResult: `${result}`
			});
			break;
		}

		case Keys.SQUARE_ROOT: {
			const result = Math.sqrt(Number(state.inputResult));

			if (state.inputResult === "") {
				break;
			}

			setState({
				...state,
				inputResult: `${result}`
			});
			break;
		}

		case Keys.DELETE: {
			setState({
				...state,
				inputResult: state.inputResult.slice(0, -1)
			});
			break;
		}

		case Keys.CLEAR_ENTRY: {
			setState({
				...state,
				inputResult: ""
			});
			break;
		}

		case Keys.CLEAR: {
			setState({
				...state,
				inputFormula: "",
				inputResult: ""
			});
			break;
		}

		case Keys.DOT: {
			if (state.inputResult.length < 1) {
				setState({
					...state,
					inputResult: "0."
				});
				break;
			}

			if (state.inputResult.length > 1 && state.inputResult.includes(".")) {
				break;
			}

			setState({
				...state,
				inputResult: state.inputResult + "."
			});
			break;
		}

		case Keys.PARENTHESES_LEFT: {
			setState({
				...state,
				inputResult: state.inputResult + "("
			});
			break;
		}

		case Keys.PARENTHESES_RIGHT: {
			setState({
				...state,
				inputResult: state.inputResult + ")"
			});
			break;
		}

		case Keys.PLUS_MINUS: {
			if (state.inputResult === "") {
				break;
			}

			setState({
				...state,
				inputResult: invertNumberSign(state.inputResult)
			});
			break;
		}
	}
};

export const calculateResult = (equation: string): string => {
	const multiplyDivide = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
	const plusMinus = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
	const parentheses = /(\d)?\s*\(([^()]*)\)\s*/;

	let originalEquation = equation;
	let currentEquation;

	while (originalEquation.search(/^\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*$/) === -1) {
		originalEquation = calculateParentheses(originalEquation);

		if (originalEquation === currentEquation) {
			return "Error";
		}

		currentEquation = originalEquation;
	}

	return originalEquation;

	function calculateParentheses(equation: string) {
		while (equation.search(parentheses) !== -1) {
			equation = equation.replace(parentheses, (a, b, c) => {
				c = handleMultiplicationDivision(c);
				c = handleAdditionSubtraction(c);

				return typeof b === "string" ? b + "*" + c : c;
			});
		}

		equation = handleMultiplicationDivision(equation);
		equation = handleAdditionSubtraction(equation);

		return equation;
	}

	function handleMultiplicationDivision(equation: string) {
		while (equation.search(multiplyDivide) !== -1) {
			equation = equation.replace(multiplyDivide, a => {
				const sides = multiplyDivide.exec(a);

				if (sides === null) {
					return "";
				}

				const result = sides[2] === "*" ? +sides[1] * +sides[3] : +sides[1] / +sides[3];

				return result >= 0 ? "+" + result : `${result}`;
			});
		}

		return equation;
	}

	function handleAdditionSubtraction(equation: string): string {
		equation = equation.replace(/([+-])([+-])(\d|\.)/g, (a, b, c, d) => {
			return (b === c ? "+" : "-") + d;
		});

		while (equation.search(plusMinus) !== -1) {
			equation = equation.replace(plusMinus, a => {
				const sides = plusMinus.exec(a);

				if (sides === null) {
					return "";
				}

				return sides![2] === "+"
					? `${+sides[1] + +sides[3]}`
					: `${+sides![1] - +sides![3]}`;
			});
		}

		return equation;
	}
};

export const invertNumberSign = (num: string): string => {
	const number = Number(num);

	return `${number * -1}`;
};
