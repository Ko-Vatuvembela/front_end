'use client';
import { Footer } from '@/app/components/shared/Footer';
import { AuthProvider, AuthContext } from '@/app/context/AuthProvider';
import { useContext } from 'react';

export default function HomePage () {
	const userData = useContext(AuthContext);
	const data = userData;

	return (
		<AuthProvider>
			<>
				<h1>
					{data?.nome} {data?.sobrenome} {data?.email}
				</h1>
				<Footer isLogged={!!userData} />
			</>
		</AuthProvider>
	);
}
