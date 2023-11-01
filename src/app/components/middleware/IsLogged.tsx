'use client';
import { type ReactNode, useEffect } from 'react';
import SessionProvider from '@/app/provider/session';
import { useRouter } from 'next/navigation';
import { signedURL } from '../shared/resources';

export const LoggedIn = ({ children }: { children: ReactNode }) => {
	const session = new SessionProvider();
	const router = useRouter();

	useEffect(() => {
		if (session.getUserData()) {
			router.push(signedURL);
		}
	}, []);
	return <>{children}</>;
};
