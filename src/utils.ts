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
		case "+":
		case "-":
		case "*":
		case "/": {
			setState({
				...state,
				inputTop: state.inputTop + state.inputResult + keyPressed,
				inputResult: ""
			});
			break;
		}
		case "=": {
			const result = calculateResult(state.inputTop + state.inputResult);

			setState({
				...state,
				inputTop: state.inputTop + state.inputResult + keyPressed,
				inputResult: `${result}`
			});
			break;
		}
		case "x²": {
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
		case "√": {
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
		case "Delete": {
			setState({
				...state,
				inputResult: state.inputResult.slice(0, -1)
			});
			break;
		}
		case "CE": {
			setState({
				...state,
				inputResult: ""
			});
			break;
		}
		case "C": {
			setState({
				...state,
				inputTop: "",
				inputResult: ""
			});
			break;
		}
		case ".": {
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
		case "(": {
			setState({
				...state,
				inputResult: state.inputResult + "("
			});
			break;
		}
		case ")": {
			setState({
				...state,
				inputResult: state.inputResult + ")"
			});
			break;
		}
		case "+/-": {
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
