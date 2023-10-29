'use client';
import { AuthProvider, AuthContext } from '@/app/context/AuthProvider';
import { useContext } from 'react';

export const VerifyAccount = () => {
	const userData = useContext(AuthContext);
	const { nome, sobrenome, email, ativada, token, foto, uid } = userData;
	return (
		<AuthProvider>
			<>
				<h1>
					{nome} {sobrenome} {email} você precisa de activar a tua
					conta.
				</h1>
			</>
		</AuthProvider>
	);
};
