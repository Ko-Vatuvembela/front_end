'use client';
import { TextLink } from './Link';

export const Footer = ({ optinalStyle = '', isLogged = false }) => {
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
					<li className={isLogged ? 'md:inline mx-5' : 'hidden'}>
						<TextLink href={'/signed-in/logout'} text="Logout" />
					</li>
				</ul>
				<p>{new Date().getFullYear()} &copy; Ko Vatuvembela</p>
			</div>
		</div>
	);
};
