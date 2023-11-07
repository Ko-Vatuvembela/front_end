'use client';

import Link from 'next/link';
import Image from 'next/image';

export const Menu = ({
	optinalStyle = '',
	foto = '/images/utilizador.svg',
}) => {
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
			<Link href={'#'} className="align-baseline my-auto">
				<Image src={foto} width={64} height={64} alt="User" />
			</Link>
		</nav>
	);
};
