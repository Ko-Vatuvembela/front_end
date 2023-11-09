'use client';
import { Footer } from '@/app/components/shared/Footer';
import { AuthProvider, AuthContext } from '@/app/context/AuthProvider';
import { useContext } from 'react';
import { Menu } from '@/app/components/shared/Menu';
import SessionProvider from '@/app/provider/session';
import Image from 'next/image';
import { type MenuOptionType } from '@/app/components/types';

const sessionProvider = new SessionProvider();

export default function HomePage() {
	const userData = useContext(AuthContext);
	const IMAGE_DIR = '/images/';
	const width = 125;
	const height = 125;

	const menuOptions: MenuOptionType[] = [
		{
			text: 'Dicionário',
			image: IMAGE_DIR + 'dic.svg',
			height,
			width,
		},
		{
			text: 'Gramática',
			image: IMAGE_DIR + 'gramatica.svg',
			height,
			width,
		},
		{
			text: 'Suporte',
			image: IMAGE_DIR + 'suporte.svg',
			height,
			width,
		},
		{
			text: 'Provérbios',
			image: IMAGE_DIR + 'proverbios.svg',
			height,
			width,
		},
		{
			text: 'Sobre',
			image: IMAGE_DIR + 'sobre.svg',
			height,
			width,
		},
		{
			text: 'Fórum de discussão',
			image: IMAGE_DIR + 'forum.svg',
			height,
			width,
		},
	];
	return (
		<AuthProvider>
			<>
				<Menu /* foto={data?.foto} */ />
				<div className="mx-auto my-[5rem] w-[60%]   grid grid-cols-3  content-center  text-center">
					{menuOptions.map(({ height, image, text, width }, id) => (
						<section
							className="block  bg-primaryOrangeWeb"
							key={id}
						>
							<Image
								src={image}
								width={width}
								height={height}
								alt="image"
								className="mx-auto"
							/>
							<span className="w-full relative font-normal text-normal  text-primaryBlue ">
								{text}
							</span>
						</section>
					))}
				</div>
				<Footer />
			</>
		</AuthProvider>
	);
}
