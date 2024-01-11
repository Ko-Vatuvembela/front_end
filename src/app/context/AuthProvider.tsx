'use client';
import { createContext, useEffect } from 'react';
import SessionProvider from '../provider/session';
import { useRouter } from 'next/navigation';
import { type IUser } from '../components/types';

const session = new SessionProvider();
const userData = session.getUserData();
const AuthContext = createContext<IUser | null>(userData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	useEffect(() => {
		if (userData === null) {
			router.replace('/');
		} else {
			if (!userData.ativada) {
				const { email } = userData;
				localStorage.setItem('email', email);
				session.deleteSession();
				router.replace('/public/verify');
			}
		}
	});

	return (
		<AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
	);
};
export { AuthContext, AuthProvider };
