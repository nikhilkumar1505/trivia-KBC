import React, { useEffect } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import KBButton from '../Button';
import './style.scss';

interface TimerInterface {
	counter: number | undefined;
	setCounter: (val: any) => void;
}

const Timer: React.FC<TimerInterface> = ({ counter, setCounter }) => {
	const gameOver = useAppSelector((state) => state.quiz.gameOver);

	useEffect(() => {
		if (!gameOver) {
			const interval = setInterval(
				() => setCounter((prev: number) => (prev ? prev - 1 : counter)),
				1000
			);
			return () => clearInterval(interval);
		}
	}, [gameOver]);

	return (
		<div className='timer-container'>
			<KBButton
				text={`${counter && counter > 9 ? counter : `0${counter}`}`}
				className='timer'
			/>
		</div>
	);
};

export default Timer;
