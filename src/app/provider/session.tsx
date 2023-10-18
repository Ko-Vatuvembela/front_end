import { type UserType, type SessionType } from '../components/types';

export default class SessionProvider {
	setToken(tokens: string) {
		sessionStorage.setItem('token', tokens);
	}

	isSession() {
		try {
			return sessionStorage.length > 0;
		} catch (e) {
			return false;
		}
	}

	setUserData(userData: UserType) {
		sessionStorage.setItem('userData', JSON.stringify(userData));
	}

	getUserData() {
		if (this.isSession()) {
			return JSON.parse(sessionStorage.getItem('userData') as string);
		}
		return false;
	}

	updateUserData(updateData: UserType) {
		if (this.isSession()) {
			sessionStorage.setItem('userData', JSON.stringify(updateData));
		}
	}

	getToken() {
		if (this.isSession()) {
			return sessionStorage.getItem('token');
		}
		return false;
	}

	getSession() {
		if (this.isSession()) {
			const token = sessionStorage.getItem('token');
			const session: SessionType = {
				token: token as string,
				data: new Date(),
			};
			return JSON.parse(JSON.stringify(session));
		}
		return false;
	}

	deleteSession() {
		sessionStorage.clear();
	}

	isAuthenticated(): boolean {
		return this.isSession();
	}
}
