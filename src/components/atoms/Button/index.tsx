import React, { useCallback } from 'react';
import './style.scss';

interface KBButtonProps {
	text?: string;
	type?: 'large' | 'small';
	onClick?: (val: any) => void;
	className?: string;
	pressable?: boolean;
	resultColor?: string;
	value?: any;
	disable?: boolean;
}

const KBButton: React.FC<KBButtonProps> = ({
	type = 'small',
	pressable,
	onClick,
	className,
	resultColor,
	value,
	text,
	disable,
}) => {
	const buttonStyles = {
		cursor: pressable && !disable ? 'pointer' : 'auto',
		borderWidth: type !== 'small' ? '3px' : '2px',
		backgroundColor: disable ? 'gray' : resultColor,
		fontSize: type !== 'small' ? '2.2rem' : '1.6rem',
		opacity: disable ? 0.8 : 1,
	};

	const onButtonClick = useCallback(() => {
		if (pressable && !disable && onClick) {
			onClick(value);
		}
	}, [onClick, pressable, disable, value]);
	return (
		<div
			className={`btn-container ${className} ${!resultColor ? 'gradient' : ''}`}
			style={buttonStyles}
			onClick={onButtonClick}>
			{text}
		</div>
	);
};

export default KBButton;
