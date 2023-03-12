import React from 'react';
import { SpinnerCircular } from 'spinners-react';
import './style.scss';

const Spinner = () => {
	return (
		<div className='main'>
			<SpinnerCircular color='#cb9513' size={100} thickness={150} />
		</div>
	);
};

export default Spinner;
