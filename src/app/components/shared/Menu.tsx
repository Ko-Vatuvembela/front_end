'use client';

import Link from 'next/link';
import Image from 'next/image';
import SessionProvider from '@/app/provider/session';
import { DEFAULT_IMAGE } from './resources';

const session = new SessionProvider();

export const Menu = ({ optinalStyle = '', foto = DEFAULT_IMAGE }) => {
	return (
		<nav
			className={
				optinalStyle +
				'py-4 px-6 flex mb-5 justify-between shadow-xl mbshadow-xl-5'
			}
		>
			<Link href="/signed-in/home" className="my-auto">
				<Image
					src={'/images/logo.svg'}
					width={256}
					height={256}
					alt="logo"
				/>
			</Link>
			<Link
				href={'/signed-in/profile'}
				className="align-baseline my-auto"
			>
				<Image
					loader={() => session.getUserPhoto()}
					src={foto}
					width={64}
					className="rounded-full"
					height={64}
					alt="User"
				/>
			</Link>
		</nav>
	);
};
