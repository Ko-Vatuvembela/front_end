import { getHeaders } from '../components/shared/resources';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default class FetchRequest {
	async post (url: string, data: object) {
		const headers = getHeaders();
		try {
			const request = await fetch(BASE_URL + url, {
				method: 'POST',
				body: JSON.stringify(data),
				headers,
				cache: 'no-cache',
			});
			return request;
		} catch (e: any) {
			return null;
		}
	}

	async put (url: string, id: number, data: any) {
		const headers = getHeaders();

		return await fetch(`${BASE_URL + url}/${id}`, {
			body: JSON.stringify(data),
			headers,
			method: 'PUT',
			cache: 'no-cache',
		});
	}

	async delete (url: string, id: number) {
		const headers = getHeaders();

		return await fetch(`${BASE_URL + url}/${id}`, {
			headers,
			method: 'DELETE',
			cache: 'no-cache',
		});
	}

	async get (url: string) {
		const headers = getHeaders();

		return await fetch(BASE_URL + url, {
			headers,
			method: 'GET',
			cache: 'no-cache',
		});
	}
}
