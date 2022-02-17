import * as React from "react";

interface IDisplayProps {
	top: string;
	result: string;
}

const Display: React.FunctionComponent<IDisplayProps> = ({ top, result}) => {
	return (
		<div className="input-area">
			<div className="input-container">
				<div className="input-top">{top}</div>
				<div className="input-result">{result}</div>
			</div>
		</div>
	);
};

export default Display;
