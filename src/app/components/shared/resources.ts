import FetchRequest from '@/app/provider/api';
import SessionProvider from '@/app/provider/session';
const session = new SessionProvider();

export const getHeaders = (): Headers => {
	const headers = new Headers({ 'Content-Type': 'application/json' });
	if (session.isAuthenticated()) {
		const token = session.getUserData()?.token;
		headers.append('Authorization', `Bearer ${token}`);
	}
	return headers;
};
export function capitalize(e: string) {
	return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
}
export function filterNumbers(e: string): string {
	let ret = '';
	for (const a of e) {
		const tmp = Number(a);
		if (Number.isSafeInteger(tmp)) ret += a;
	}
	return ret;
}
export const sendMail = async (email: string): Promise<boolean> => {
	const request = await new FetchRequest().post('mail/send_code', {
		email,
	});
	return request?.status === 200;
};
export const signedURL = '/signed-in/home';
export const loginURL = '/';
