'use client';
import { useRouter } from 'next/navigation';
import SessionProvider from '@/app/provider/session';

export default function Logout() {
	const router = useRouter();
	new SessionProvider().deleteSession();
	router.replace('/');
	return <></>;
}
