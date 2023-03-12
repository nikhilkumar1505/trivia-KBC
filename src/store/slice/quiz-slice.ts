import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface quizListInterace {
	question: string;
	correctAnswer: string;
	options?: { label: string; value: string }[];
}
export type difficultly = 'easy' | 'medium' | 'hard';

interface quizInterface {
	currentpriceId: number;
	difficult: difficultly;
	quizList: quizListInterace;
	playerName: string;
	priceAmountId: number;
	gameOver: boolean;
	loading: boolean;
}

const initialState: quizInterface = {
	currentpriceId: 0,
	difficult: 'easy',
	quizList: {
		question: '',
		correctAnswer: '',
		options: [{ label: '', value: '' }],
	},
	playerName: '',
	priceAmountId: 0,
	gameOver: false,
	loading: true,
};

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		updateCurrentPriceId(state, action: PayloadAction<number>) {
			state.currentpriceId = action.payload;
		},
		updatePriceAmountId(state, action: PayloadAction<number>) {
			state.priceAmountId = action.payload;
		},
		updatePlayerName(state, action: PayloadAction<string>) {
			state.playerName = action.payload;
		},
		updateDifficultyLevel(state, action: PayloadAction<difficultly>) {
			state.difficult = action.payload;
		},
		updateQuizList(state, action: PayloadAction<quizListInterace>) {
			state.quizList = action.payload;
		},
		updateGameOver(state, action: PayloadAction<boolean>) {
			state.gameOver = action.payload;
		},
		updateLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
		},
		resetQuiz: () => initialState,
	},
});

export const {
	updateQuizList,
	updateCurrentPriceId,
	updateDifficultyLevel,
	updatePlayerName,
	updatePriceAmountId,
	updateGameOver,
	updateLoading,
	resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
