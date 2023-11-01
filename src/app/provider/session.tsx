import { type UserType } from '../components/types';

export default class SessionProvider {
	setToken (tokens: string): void {
		sessionStorage.setItem('token', tokens);
	}

	isSession (): boolean {
		try {
			return sessionStorage.length > 0;
		} catch (e) {
			return false;
		}
	}

	setUserData (userData: UserType): void {
		sessionStorage.setItem('userData', JSON.stringify(userData));
	}

	getUserData (): UserType | null {
		if (this.isSession()) {
			return Object(
				JSON.parse(sessionStorage.getItem('userData') as string)
			) as UserType;
		}
		return null;
	}

	updateUserData (updateData: UserType): void {
		if (this.isSession()) {
			sessionStorage.setItem('userData', JSON.stringify(updateData));
		}
	}

	deleteSession (): void {
		sessionStorage.clear();
		localStorage.clear();
	}

	isAuthenticated (): boolean {
		return this.isSession();
	}
}
