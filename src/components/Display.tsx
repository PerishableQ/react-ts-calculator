import * as React from "react";

interface IDisplayProps {
	formula: string;
	result: string;
}

const Display: React.FunctionComponent<IDisplayProps> = ({ formula, result}) => {
	return (
		<div className="input-area">
			<div className="input-container">
				<div className="input-formula">{formula}</div>
				<div className="input-result">{result}</div>
			</div>
		</div>
	);
};

export default Display;
