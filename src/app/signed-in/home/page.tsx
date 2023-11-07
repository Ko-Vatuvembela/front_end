'use client';
import { Footer } from '@/app/components/shared/Footer';
import { AuthProvider, AuthContext } from '@/app/context/AuthProvider';
import { useContext } from 'react';
import { Menu } from '@/app/components/shared/Menu';

export default function HomePage() {
	const userData = useContext(AuthContext);
	const data = userData;

	return (
		<AuthProvider>
			<>
				<Menu /* foto={data?.foto} */ />
				<Footer isLogged={!!userData} />
			</>
		</AuthProvider>
	);
}
