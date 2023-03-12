import React, { useCallback } from 'react';
import { useAppSelector } from '../../../hooks/useRedux';
import { MoneyList } from '../../../utils/Constants';
import { RxCross2 } from 'react-icons/rx';
import './style.scss';

const MoneyDrawer: React.FC = () => {
	const currentPriceId = useAppSelector((state) => state.quiz.currentpriceId);
	const playerName = useAppSelector((state) => state.quiz.playerName);

	const dispalyDimond = useCallback(
		(id: number) => {
			let spanEle = <span> </span>;
			if (id < currentPriceId) {
				spanEle = <span style={{ color: '#cb9513' }}>&#x2756;</span>;
			}
			if (id === currentPriceId) {
				spanEle = <span style={{ color: '#ffffff' }}>&#x2756;</span>;
			}
			return <div className='diamond'>{spanEle}</div>;
		},
		[currentPriceId]
	);
	const renderList = useCallback(
		() =>
			MoneyList.slice()
				.reverse()
				.map((value) => {
					const textStyle = { color: value.safe ? 'white' : '#cb9513' };
					const boxClassName = currentPriceId === value.id ? 'box' : '';
					return (
						<div
							className={`money-list-container ${boxClassName}`}
							key={value.id}>
							<p style={textStyle}>{value.id + 1}</p>
							{dispalyDimond(value.id)}
							<p style={textStyle}>{`₹ ${value.price}`}</p>
						</div>
					);
				}),
		[MoneyList, currentPriceId]
	);

	const closeDrawer = () => {
		const ele = document.getElementById('money-container');
		if (ele) {
			ele.classList.remove('show-menu');
		}
	};
	return (
		<div className='money-container' id='money-container'>
			<div className='header'>
				<div className='cross-icon' onClick={closeDrawer}>
					<RxCross2 size={30} color='#ffff' />
				</div>
				<p>{playerName}</p>
				<img src={'/profile.png'} alt='' />
			</div>
			<div className='list-main'>{renderList()}</div>
		</div>
	);
};

export default MoneyDrawer;
