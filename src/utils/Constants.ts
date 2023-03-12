import string from '../localization';

export const MoneyList = [
	{ id: 0, price: '1,000' },
	{ id: 1, price: '2,000' },
	{ id: 2, price: '3,000' },
	{ id: 3, price: '5,000' },
	{ id: 4, price: '10,000', safe: true },
	{ id: 5, price: '20,000' },
	{ id: 6, price: '40,000' },
	{ id: 7, price: '80,000' },
	{ id: 8, price: '1,60,000' },
	{ id: 9, price: '3,20,000', safe: true },
	{ id: 10, price: '6,40,000' },
	{ id: 11, price: '12,50,000' },
	{ id: 12, price: '25,00,000' },
	{ id: 13, price: '50,00,000' },
	{ id: 14, price: '1 crore' },
	{ id: 15, price: '7 crore' },
];

export const RULES = [
	{ id: 'a', text: string['landing.rules_a'] },
	{
		id: 'b',
		text: string['landing.rules_b'],
	},
	{
		id: 'c',
		text: string['landing.rules_c'],
	},
	{
		id: 'd',
		text: string['landing.rules_d'],
	},
	{
		id: 'e',
		text: string['landing.rules_e'],
	},
	{
		id: 'f',
		text: string['landing.rules_f'],
	},
	{
		id: 'g',
		text: string['landing.rules_g'],
	},
];

export const BASE_URL = 'https://the-trivia-api.com/api/questions';
