import React, {
	useCallback,
	useEffect,
	useRef,
	useState,
	CSSProperties,
} from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

function randomInRange(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

const canvasStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	width: '100%',
	height: '100%',
	top: 0,
	left: 0,
	zIndex: 1000,
};

function getAnimationSettings(originXA: number, originXB: number) {
	return {
		startVelocity: 30,
		spread: 300,
		ticks: 60,
		zIndex: 1000,
		particleCount: 150,
		origin: {
			x: randomInRange(originXA, originXB),
			y: Math.random() - 0.2,
		},
	};
}

export default function Fireworks({
	startFireworks,
}: {
	startFireworks: boolean;
}) {
	const refAnimationInstance = useRef<any>();
	const [intervalId, setIntervalId] = useState<any>();

	const ref = useCallback((instance: any) => {
		refAnimationInstance.current = instance;
	}, []);

	const nextTickAnimation = useCallback(() => {
		if (refAnimationInstance.current) {
			refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
			refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
		}
	}, []);

	useEffect(() => {
		if (refAnimationInstance.current) {
			if (startFireworks) {
				startAnimation();
			} else {
				stopAnimation();
			}
		}
	}, [startFireworks, refAnimationInstance]);

	const startAnimation = useCallback(() => {
		if (!intervalId) {
			setIntervalId(setInterval(nextTickAnimation, 400));
		}
	}, [intervalId, nextTickAnimation]);

	const stopAnimation = useCallback(() => {
		clearInterval(intervalId);
		setIntervalId(null);
		refAnimationInstance.current && refAnimationInstance.current.reset();
	}, [intervalId]);

	useEffect(() => {
		return () => {
			clearInterval(intervalId);
		};
	}, [intervalId]);

	return (
		<ReactCanvasConfetti
			refConfetti={ref}
			style={canvasStyles as CSSProperties}
		/>
	);
}
