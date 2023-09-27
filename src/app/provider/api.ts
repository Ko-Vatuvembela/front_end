import { getHeaders } from '../components/shared/resources';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default class FetchRequest {
	async post(url: string, data: object) {
		const headers = getHeaders();
		return await fetch(BASE_URL + url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers,
		});
	}

	async put(url: string, id: number, data: any) {
		const headers = getHeaders();

		return await fetch(`${BASE_URL + url}/${id}`, {
			body: JSON.stringify(data),
			headers,
			method: 'PUT',
		});
	}

	async delete(url: string, id: number) {
		const headers = getHeaders();

		return await fetch(`${BASE_URL + url}/${id}`, {
			headers,
			method: 'DELETE',
		});
	}

	async get(url: string) {
		const headers = getHeaders();

		return await fetch(BASE_URL + url, {
			headers,
			method: 'GET',
		});
	}
}
