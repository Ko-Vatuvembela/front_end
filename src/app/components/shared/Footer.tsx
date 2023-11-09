'use client';
import { useEffect, useState } from 'react';
import { TextLink } from './Link';
import SessionProvider from '@/app/provider/session';

const sessionProvider = new SessionProvider();

export const Footer = ({ optinalStyle = '' }) => {
	const [style, updateStyle] = useState('');

	useEffect(() => {
		updateStyle(
			sessionProvider.isAuthenticated() ? 'md:inline mx-5' : 'hidden'
		);
	}, []);

	return (
		<div className={optinalStyle}>
			<div className={' text-center mb-5 z-100'}>
				<ul className={'list-none p-3'}>
					<li className="md:inline mx-5">
						<TextLink href={'#'} text="Sobre" />
					</li>
					<li className="md:inline mx-5">
						<TextLink href={'#'} text="Contactos" />
					</li>
					<li className="md:inline mx-5">
						<TextLink href={'#'} text="Suporte" />
					</li>
					<li className="md:inline mx-5">
						<TextLink href={'#'} text="Transparência" />
					</li>
					<li className={style}>
						<TextLink href={'/signed-in/logout'} text="Logout" />
					</li>
				</ul>
				<p>{new Date().getFullYear()} &copy; Ko Vatuvembela</p>
			</div>
		</div>
	);
};
