'use client';
import { type ReactNode, useEffect } from 'react';
import SessionProvider from '@/app/provider/session';
import { useRouter } from 'next/navigation';
import { signedURL } from '../shared/resources';

export const IsLogged = ({ children }: { children: ReactNode }) => {
	const session = new SessionProvider();
	const router = useRouter();

	useEffect(() => {
		if (session.isSession()) {
			router.push(signedURL);
		}
	});

	return <>{children}</>;
};
