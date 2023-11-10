'use client';
import { type UserType } from '../components/types';

export default class SessionProvider {
	setToken (tokens: string): void {
		sessionStorage.setItem('token', tokens);
	}

	isSession (): boolean {
		try {
			if (typeof window !== 'undefined') {
				return sessionStorage.length > 0;
			}
			return false;
		} catch (e) {
			return false;
		}
	}

	setUserData (userData: UserType): void {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('userData', JSON.stringify(userData));
		}
	}

	getUserData (): UserType | null {
		if (typeof window !== 'undefined') {
			if (this.isSession()) {
				return Object(
					JSON.parse(sessionStorage.getItem('userData') as string)
				) as UserType;
			}
		}

		return null;
	}

	updateUserData (updateData: UserType): void {
		if (typeof window !== 'undefined') {
			if (this.isSession()) {
				sessionStorage.setItem('userData', JSON.stringify(updateData));
			}
		}
	}

	deleteSession (): void {
		if (typeof window !== 'undefined') {
			sessionStorage.clear();
		}
	}

	isAuthenticated (): boolean {
		if (typeof window !== 'undefined') {
			return this.isSession();
		}
		return false;
	}
}
