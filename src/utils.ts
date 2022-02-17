import { useState } from "react";

import { IState } from "./interfaces";

export const useAppState = (): [IState, React.Dispatch<React.SetStateAction<IState>>] => {
	const [state, setState] = useState<IState>({
		inputTop: "",
		inputResult: ""
	});

	return [state, setState];
};

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

export const calculateResult = (eq: string, callback?: Function) => {
	const mulDiv = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
	const plusMin = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/;
	const parentheses = /(\d)?\s*\(([^()]*)\)\s*/;
	var current;
	while (eq.search(/^\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*$/) === -1) {
		eq = fParentheses(eq);
		if (eq === current)
			return handleCallback(new SyntaxError("The equation is invalid."), null);
		current = eq;
	}
	return handleCallback(null, +eq);

	function fParentheses(eq: string) {
		while (eq.search(parentheses) !== -1) {
			eq = eq.replace(parentheses, (a, b, c) => {
				c = fMulDiv(c);
				c = fPlusMin(c);
				return typeof b === "string" ? b + "*" + c : c;
			});
		}
		eq = fMulDiv(eq);
		eq = fPlusMin(eq);
		return eq;
	}

	function fMulDiv(eq: any) {
		while (eq.search(mulDiv) !== -1) {
			eq = eq.replace(mulDiv, (a: any) => {
				const sides = mulDiv.exec(a) as RegExpExecArray;
				const result = sides[2] === "*" ? +sides[1] * +sides[3] : +sides[1] / +sides[3];
				return result >= 0 ? "+" + result : result;
			});
		}
		return eq;
	}

	function fPlusMin(eq: string): string {
		eq = eq.replace(/([+-])([+-])(\d|\.)/g, function (a, b, c, d) {
			return (b === c ? "+" : "-") + d;
		});
		while (eq.search(plusMin) !== -1) {
			eq = eq.replace(plusMin, a => {
				const sides = plusMin.exec(a) as RegExpExecArray;
				return sides![2] === "+"
					? `${+sides[1] + +sides[3]}`
					: `${+sides![1] - +sides![3]}`;
			});
		}
		return eq;
	}

	function handleCallback(errObject: Error | null, result: number | null) {
		if (typeof callback !== "function") {
			if (errObject !== null) throw errObject;
		} else {
			callback(errObject, result);
		}
		return result;
	}
};

export const invertNumberSign = (num: string) => {
	const number = Number(num);

	return number >= 0 ? `${-Math.abs(number)}` : `${Math.abs(number)}`;
};
