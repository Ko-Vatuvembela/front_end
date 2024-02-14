'use client';
import { type IUpdateUser, type IUser } from '../components/types';

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

	setUserData (userData: IUser): void {
		if (typeof window !== 'undefined') {
			sessionStorage.setItem('userData', JSON.stringify(userData));
		}
	}

	getUserPhoto (): string {
		const userData = this.getUserData();
		const host = process.env.NEXT_PUBLIC_SERVER_HOST;
		const protocol = process.env.NEXT_PUBLIC_SERVER_PROTOCOL;
		const port = process.env.NEXT_PUBLIC_SERVER_PORT;
		const path = process.env.NEXT_PUBLIC_SERVER_PATH;
		return `${protocol}://${host}:${port}/${path}/${userData?.foto}`;
	}

	getUserData (): IUser | null {
		if (typeof window !== 'undefined') {
			if (this.isSession()) {
				return Object(
					JSON.parse(sessionStorage.getItem('userData') as string)
				) as IUser;
			}
		}
		return null;
	}

	updateUserData (updateData: IUpdateUser): void {
		if (typeof window !== 'undefined') {
			if (this.isSession()) {
				const userData = this.getUserData() as IUser;
				Object.assign(userData, updateData);
				sessionStorage.setItem('userData', JSON.stringify(userData));
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
