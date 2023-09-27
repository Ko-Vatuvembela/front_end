import SessionProvider from '@/app/provider/session';

const session = new SessionProvider();

export const getHeaders = (): Headers => {
	const headers = new Headers({ 'Content-Type': 'application/json' });
	if (session.isAuthenticated()) {
		const token = session.getSession().token;
		headers.append('Authorization', `Bearer ${token}`);
	}
	return headers;
};
