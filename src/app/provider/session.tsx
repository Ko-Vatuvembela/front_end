'use client';
import { type IUser } from '../components/types';

export default class SessionProvider {
	setToken(tokens: string): void {
		sessionStorage.setItem('token', tokens);
	}

	isSession(): boolean {
		try {
			if (typeof window !== 'undefined') {
				return sessionStorage.length > 0;
			}
			return false;
		} catch (e) {
			return false;
		}
	}

	setUserData(userData: IUser): void {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('userData', JSON.stringify(userData));
		}
	}

	getUserData(): IUser | null {
		if (typeof window !== 'undefined') {
			if (this.isSession()) {
				return Object(
					JSON.parse(sessionStorage.getItem('userData') as string)
				) as IUser;
			}
		}

		return null;
	}

	updateUserData(updateData: IUser): void {
		if (typeof window !== 'undefined') {
			if (this.isSession()) {
				sessionStorage.setItem('userData', JSON.stringify(updateData));
			}
		}
	}

	deleteSession(): void {
		if (typeof window !== 'undefined') {
			sessionStorage.clear();
		}
	}

	isAuthenticated(): boolean {
		if (typeof window !== 'undefined') {
			return this.isSession();
		}
		return false;
	}
}
