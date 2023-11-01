'use client';
import { AuthProvider, AuthContext } from '@/app/context/AuthProvider';
import { useContext } from 'react';

export default function HomePage() {
	const userData = useContext(AuthContext);
	const { nome, sobrenome, email, ativada, token, foto, uid } = userData;
	console.log(ativada);
	return (
		<AuthProvider>
			<>
				<h1>
					{nome} {sobrenome} {email}
				</h1>
			</>
		</AuthProvider>
	);
}
