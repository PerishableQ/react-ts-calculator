import * as React from 'react';

interface IContainerProps {
	children: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = ({ children }) => {
  return <section className='app'>{children}</section>;
};

export default Container;

