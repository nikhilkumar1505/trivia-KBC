import React, { useMemo, useState } from 'react';
import Modal from 'react-modal';
import { Sounds } from '../../../Assets/audio';
import { useAppDispatch } from '../../../hooks/useRedux';
import string from '../../../localization';
import { updatePlayerName } from '../../../store/slice/quiz-slice';
import { RULES } from '../../../utils/Constants';
import { KBButton } from '../../atoms';
import './style.scss';

const LandingModal = () => {
	const [open, setOpen] = useState(true);
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();
	const welcomePlay = useMemo(() => new Audio(Sounds.welcome), []);
	const [showLogo, setshowLogo] = useState(false);
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
			background: !showLogo
				? 'linear-gradient(#182180, #004b9c)'
				: 'transparent',
			border: showLogo ? 0 : '2px solid #ffff',
		},
		overlay: {
			background:
				'linear-gradient(45deg,#3a0d4e, #182180,#004b9c,#182180,#3a0d4e)',
		},
	};

	const handleClick = () => {
		if (value.trim().length >= 3) {
			setshowLogo(true);
			welcomePlay.play();
			setTimeout(() => {
				dispatch(updatePlayerName(value.trim()));
				onCloseModal();
			}, 5000);
		}
	};

	const onCloseModal = () => setOpen(false);
	return (
		<div>
			<Modal
				isOpen={open}
				onRequestClose={onCloseModal}
				style={customStyles}
				shouldCloseOnOverlayClick={false}
				shouldCloseOnEsc={false}>
				{!showLogo ? (
					<div className='modal-container'>
						<div className='title'>
							<img src='/Logo.png' alt='' />
							<h2>{string['landing.welcome']}</h2>
							<img src='/Logo.png' alt='' />
						</div>
						<div className='input-main'>
							<input
								value={value}
								placeholder={string['landing.placeholder']}
								onChange={(e) => setValue(e.target.value)}
							/>
						</div>
						<div className='rules-container'>
							<h6>{string['landing.rules_regulations']}</h6>
							<div className='rules'>
								{RULES.map((item) => (
									<p key={item.id}>{`${item.id}) ${item.text}`}</p>
								))}
							</div>
						</div>
						<KBButton
							text={string['global.play']}
							pressable
							onClick={handleClick}
							className='btn'
						/>
					</div>
				) : (
					<div className='animated-logo'>
						<img src='/Logo.png' alt='' className='dispaly-logo' />
						<p className=''>{string['landing.welcome']}</p>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default LandingModal;
