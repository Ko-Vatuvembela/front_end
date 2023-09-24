import axios from 'axios';
import SessionProvider from './session';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const session = new SessionProvider();
const axiosRequest = axios.create({
	baseURL: BASE_URL,
});

axiosRequest.interceptors.request.use(
	async (config) => {
		const retSession = await session.getSession();
		if (retSession?.token) {
			config.headers.Authorization = `Bearer ${retSession.token}`;
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	async (error) => {
		return await Promise.reject(error);
	}
);

export default class FetchRequest {
	async post (url: string, data: any) {
		return await axiosRequest.post(url, data);
	}

	async put (url: string, id: number, data: any) {
		return await axiosRequest.put(`${url}/${id}`, data);
	}

	async delete (url: string, id: number) {
		return await axiosRequest.delete(`${url}/${id}`);
	}

	async get (url: string) {
		return await axiosRequest.get(url);
	}
}
