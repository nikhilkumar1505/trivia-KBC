import React, { useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { KBButton } from '../../atoms';
import './style.scss';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		background: 'linear-gradient(#182180, #004b9c)',
		borderRadius: '1.5rem',
		zIndex: 100,
	},
	overlay: {
		background: 'rgba(0,0,0,0.8)',
		padding: '2rem',
		zIndex: 10,
	},
};

interface commmonModalProps {
	showSecondaryBtn: boolean;
	title: string;
	description: string;
	openModal: boolean;
	setOpenModal: (open: boolean) => void;
	primaryBtnText: string;
	secondaryBtnText?: string;
	onClickPrimary: () => void;
	onClickSecondary?: () => void;
}

const CommonModal: React.FC<commmonModalProps> = ({
	showSecondaryBtn,
	secondaryBtnText,
	setOpenModal,
	openModal,
	primaryBtnText,
	title = 'This IS title',
	description,
	onClickPrimary,
	onClickSecondary,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onCloseModal = useCallback(() => setOpenModal(false), []);

	useEffect(() => {
		if (openModal) {
			setTimeout(() => {
				setIsOpen(true);
			}, 1000);
		} else {
			setIsOpen(false);
		}
	}, [openModal]);

	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			shouldCloseOnOverlayClick={false}
			shouldCloseOnEsc={false}>
			<div className='common-modal-main'>
				<h5>{title}</h5>
				<p>{description}</p>
				<div className='common-btn-container'>
					<KBButton
						text={primaryBtnText}
						className='primary-btn common-btn'
						onClick={onClickPrimary}
						pressable
					/>
					{showSecondaryBtn && (
						<KBButton
							text={secondaryBtnText}
							className='secondary-btn common-btn'
							onClick={onClickSecondary}
							pressable
						/>
					)}
				</div>
			</div>
		</ReactModal>
	);
};

export default CommonModal;
