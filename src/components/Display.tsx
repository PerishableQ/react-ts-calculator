import * as React from 'react';

interface IDisplayProps {
}

const Display: React.FunctionComponent<IDisplayProps> = (props) => {
  return (
		<div className="input-area">
			<div className="input-container">
				<div className="input-top"></div>
				<div className="input-result">0</div>
			</div>
		</div>
  );
};

export default Display;

