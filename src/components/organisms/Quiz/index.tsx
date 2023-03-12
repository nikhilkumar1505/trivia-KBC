import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import {
	resetQuiz,
	updateCurrentPriceId,
	updateLoading,
	updatePriceAmountId,
} from '../../../store/slice/quiz-slice';
import {
	gameOver,
	setQuizQuestions,
	updateBreakPoint,
} from '../../../utils/helper';
import { MoneyList } from '../../../utils/Constants';
import { KBButton, Timer } from '../../atoms';
import Spinner from '../../atoms/Spinner';
import { TfiMenu } from 'react-icons/tfi';
import './style.scss';
import CommonModal from '../../modal/CommonModal';
import string from '../../../localization';
import Fireworks from '../../atoms/Confetti';
import { Sounds } from '../../../Assets/audio';

const Quiz: React.FC = () => {
	const difficult = useAppSelector((state) => state.quiz.difficult);
	const quiz = useAppSelector((state) => state.quiz.quizList);
	const currentPriceId = useAppSelector((state) => state.quiz.currentpriceId);
	const priceAmountId = useAppSelector((state) => state.quiz.priceAmountId);
	const loading = useAppSelector((state) => state.quiz.loading);
	const [className, setClassName] = useState<string>('');
	const [selectedOption, setSelectedOpton] = useState<string | undefined>();
	const [pressable, setpressable] = useState<boolean>(true);
	const TIMER =
		difficult === 'easy' ? 30 : difficult === 'medium' ? 45 : undefined;
	const [counter, setCounter] = useState(TIMER);
	const dispatch = useAppDispatch();
	const divRef = useRef<boolean>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [primaryText, setPrimaryText] = useState<string>('');
	const [secondaryText, setSecondaryText] = useState<string>('');
	const [startFireWorks, setStartFireWorks] = useState<boolean>(false);
	const correctPlay = useMemo(() => new Audio(Sounds.correct), []);
	const wrongPlay = useMemo(() => new Audio(Sounds.wrong), []);
	const congratsPlay = useMemo(() => new Audio(Sounds.congrats), []);

	useEffect(() => {
		if (currentPriceId > 15) {
			handleWinningModal(15);
			divRef.current = false;
			return;
		} else if (currentPriceId === 9) {
			updateBreakPoint('hard');
		} else if (currentPriceId === 4) {
			updateBreakPoint('medium');
		}
	}, [currentPriceId]);

	useEffect(() => {
		if (divRef.current) {
			dispatch(updateLoading(true));
			setQuizQuestions({ difficult });
			setCounter(TIMER);
		} else {
			divRef.current = true;
		}
	}, [difficult, currentPriceId, TIMER]);

	const resetState = () => {
		setClassName('');
		setSelectedOpton('');
		setpressable(true);
	};

	const handleCorrect = () => {
		setTimeout(() => {
			dispatch(updateCurrentPriceId(currentPriceId + 1));
			resetState();
		}, 3000);
	};

	const handleWrong = () => {
		gameOver();
		setPrimaryText(string['quiz.wrong_option']);
		setSecondaryText(
			string.formatString(
				string['quiz.correct_answer_info'],
				quiz.correctAnswer
			) as string
		);
		setIsModalOpen(true);
	};

	const TimesUp = () => {
		gameOver();
		setPrimaryText(string['quiz.times_up']);
		setSecondaryText(string['quiz.sorry_better_luck']);
		setIsModalOpen(true);
	};

	const handleQuit = () => {
		setPrimaryText(string['quiz.sure_quit']);
		setSecondaryText(
			string.formatString(
				string['quiz.quit_desc'],
				MoneyList[currentPriceId - 1].price
			) as string
		);
		setIsModalOpen(true);
	};

	const handleWinningModal = useCallback(
		(finalAmountId?: number) => {
			gameOver();
			setPrimaryText(string['quiz.congratulations']);
			setSecondaryText(
				string.formatString(
					string['quiz.congratulations_desc'],
					MoneyList[finalAmountId || priceAmountId].price
				) as string
			);
			setIsModalOpen(true);
			setStartFireWorks(true);
			congratsPlay.play();
		},
		[priceAmountId, currentPriceId]
	);

	const handleModalClose = () => {
		setIsModalOpen(false);
		setPrimaryText('');
		setSecondaryText('');
	};

	const handleClick = (selectedOption: string) => {
		setSelectedOpton(selectedOption);
		setClassName('option-btn-active');
		setpressable(false);
		setTimeout(() => {
			if (selectedOption === quiz.correctAnswer) {
				setClassName('option-btn-correct');
				correctPlay.play();
				handleCorrect();
			} else {
				setClassName('option-btn-wrong');
				wrongPlay.play();
				handleWrong();
			}
		}, 2000);
	};

	useEffect(() => {
		if (counter === 0) {
			TimesUp();
		}
	}, [counter]);

	const resetGame = useCallback(() => {
		handleModalClose();
		dispatch(resetQuiz());
	}, []);

	const handleMenuClick = () => {
		const ele = document.getElementById('money-container');
		if (ele) {
			ele.classList.add('show-menu');
		}
	};

	const handleQuitSure = () => {
		dispatch(updatePriceAmountId(currentPriceId - 1));
		handleWinningModal(currentPriceId - 1);
	};

	const handleModalClicks = useCallback(() => {
		switch (primaryText) {
			case string['quiz.congratulations']:
				return {
					primaryBtn: resetGame,
					primaryText: string['modal.ok'],
				};
			case string['quiz.sure_quit']:
				return {
					primaryBtn: handleQuitSure,
					primaryText: string['modal.yes'],
					secondaryText: string['modal.no'],
					secondaryBtn: handleModalClose,
				};
			case string['quiz.wrong_option']:
				return {
					primaryBtn: currentPriceId > 0 ? handleWinningModal : resetGame,
					primaryText: string['modal.ok'],
				};
			case string['quiz.times_up']:
				return {
					primaryBtn: currentPriceId > 0 ? handleWinningModal : resetGame,
					primaryText: string['modal.ok'],
				};
			default:
				return {
					primaryBtn: handleWinningModal,
					primaryText: string['modal.ok'],
				};
		}
	}, [primaryText, handleWinningModal, currentPriceId, resetGame]);

	const buttonConfigs = useMemo(() => handleModalClicks(), [handleModalClicks]);

	const renderQuiz = () => {
		return (
			<div className='quiz'>
				{!!TIMER && <Timer counter={counter} setCounter={setCounter} />}
				<KBButton
					text={quiz.question}
					type='large'
					className='border-radius-2rem question'
				/>
				<div className='option-wrapper'>
					{quiz?.options?.map((options, index) => (
						<div
							className='options'
							key={options.label}
							style={{ marginRight: index % 2 === 0 ? '4rem' : '' }}>
							<KBButton
								text={`${String.fromCodePoint(parseInt('2756', 16))} ${
									options.label
								}: ${options.value} 	
										`}
								className={` ${
									selectedOption === options.value ? className : 'option-btn'
								}`}
								pressable={pressable}
								onClick={handleClick}
								value={options.value}
							/>
						</div>
					))}
				</div>
				<div className='quit-main'>
					<KBButton
						text={string['quiz.quit']}
						className='quit'
						pressable
						onClick={handleQuit}
						disable={currentPriceId === 0}
					/>
				</div>
			</div>
		);
	};

	return (
		<>
			{quiz && (
				<div className='quiz-container'>
					<div className='menu' onClick={handleMenuClick}>
						{<TfiMenu size={27} color='#ffff' />}
					</div>
					{loading ? <Spinner /> : renderQuiz()}
					<CommonModal
						setOpenModal={setIsModalOpen}
						openModal={isModalOpen}
						primaryBtnText={buttonConfigs.primaryText}
						showSecondaryBtn={!!buttonConfigs.secondaryText}
						secondaryBtnText={buttonConfigs?.secondaryText}
						title={primaryText}
						description={secondaryText}
						onClickPrimary={buttonConfigs?.primaryBtn}
						onClickSecondary={buttonConfigs?.secondaryBtn}
					/>
					<Fireworks startFireworks={startFireWorks} />
				</div>
			)}
		</>
	);
};

export default Quiz;
