import axios from 'axios';
import { BASE_URL } from '../utils/Constants';

export class ApiService {
	static async getQuestions({ difficult }: { difficult: string }) {
		try {
			const res = await axios.get(BASE_URL, {
				params: {
					limit: 1,
					difficulty: difficult,
				},
			});
			return res;
		} catch (err) {
			Promise.reject(err);
		}
	}
}
