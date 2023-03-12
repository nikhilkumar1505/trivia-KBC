import React from 'react';
import './App.scss';
import { MoneyDrawer, Quiz } from './components';
import PlayerModal from './components/modal/LandingModal';
import { useAppSelector } from './hooks/useRedux';

function App() {
	const name = useAppSelector((state) => state.quiz.playerName);
	return (
		<>
			{name.length ? (
				<div className='App'>
					<Quiz />
					<MoneyDrawer />
				</div>
			) : (
				<PlayerModal />
			)}
		</>
	);
}

export default App;
