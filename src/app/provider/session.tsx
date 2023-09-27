import { type UserType, type SessionType } from '../components/types';

export default class SessionProvider {
	setToken(tokens: string) {
		sessionStorage.setItem('token', tokens);
	}

	setUserData(userData: UserType) {
		sessionStorage.setItem('userData', JSON.stringify(userData));
	}

	updateUserData(updateData: UserType) {
		sessionStorage.setItem('userData', JSON.stringify(updateData));
	}

	static getToken() {
		return sessionStorage.getItem('token');
	}

	getSession() {
		if (typeof sessionStorage !== 'undefined') {
			const token = sessionStorage.getItem('token');
			const session: SessionType = {
				token: token as string,
				data: new Date(),
			};
			return JSON.parse(JSON.stringify(session));
		}
		return undefined;
	}

	deleteSession() {
		sessionStorage.clear();
	}

	isAuthenticated(): boolean {
		return this.getSession() !== undefined;
	}
}
