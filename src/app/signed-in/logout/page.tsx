'use client';
import { useRouter } from 'next/navigation';
import SessionProvider from '@/app/provider/session';
import { useEffect } from 'react';

export default function Logout () {
	const router = useRouter();
	useEffect(() => {
		new SessionProvider().deleteSession();
		router.replace('/');
	});

	return <></>;
}
