'use client';
import { createContext, useEffect } from 'react';
import SessionProvider from '../provider/session';
import { useRouter } from 'next/navigation';
import { type UserType } from '../components/types';

const session = new SessionProvider();
const userData = session.getUserData();
const AuthContext = createContext<UserType | null>(userData);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();

	useEffect(() => {
		if (userData === null) {
			router.replace('/');
		}
	});
	return (
		<AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
	);
};
export { AuthContext, AuthProvider };
