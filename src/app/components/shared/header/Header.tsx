import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '../Menu';
import SessionProvider from '@/app/provider/session';
import { useEffect, useState } from 'react';

const session = new SessionProvider();

export const Header = () => {
	const [isLogged, setLogged] = useState(false);
	useEffect(() => {
		setLogged(session.isSession());
	}, []);

	if (isLogged) return <Menu />;
	return (
		<nav className="w-full">
			<Link href="/">
				<Image
					className="mx-auto my-5"
					src={'/images/logo.svg'}
					width={253}
					height={50}
					alt="Logo image"
				/>
			</Link>
		</nav>
	);
};
