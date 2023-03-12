import { ApiService } from '../networkManager/network';
import {
	difficultly,
	quizListInterace,
	updateDifficultyLevel,
	updateGameOver,
	updateLoading,
	updatePriceAmountId,
	updateQuizList,
} from '../store/slice/quiz-slice';
import store from '../store/store';

const randomlyAddOptions = (correctValue: string, options?: string[]) => {
	const randomNumber = Math.floor(Math.random() * 4);
	options?.splice(randomNumber, 0, correctValue);
	return options?.map((item, index) => ({
		label: String.fromCharCode(65 + Number(index)),
		value: item,
	}));
};

const organizeQuizdata = (data: any) => {
	const payload: quizListInterace = {
		question: data.question,
		options: randomlyAddOptions(data.correctAnswer, data.incorrectAnswers),
		correctAnswer: data.correctAnswer,
	};
	return payload;
};

export const setQuizQuestions = async (payload: { difficult: string }) => {
	try {
		const res = await ApiService.getQuestions(payload);
		if (res?.status === 200) {
			store.dispatch(updateQuizList(organizeQuizdata(res.data[0])));
			store.dispatch(updateLoading(false));
		}
	} catch (err) {}
};

export const gameOver = () => {
	store.dispatch(updateGameOver(true));
};

export const updateBreakPoint = (difficult: difficultly) => {
	const currentPriceId = store.getState().quiz.currentpriceId;
	store.dispatch(updateDifficultyLevel(difficult));
	store.dispatch(updatePriceAmountId(currentPriceId));
};
