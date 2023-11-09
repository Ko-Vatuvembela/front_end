'use client';
import { Footer } from '@/app/components/shared/Footer';
import { AuthProvider /* AuthContext */ } from '@/app/context/AuthProvider';
// import { useContext } from 'react';
import { Menu } from '@/app/components/shared/Menu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { type MenuOptionType } from '@/app/components/types';

export default function HomePage() {
	// const userData = useContext(AuthContext);
	const IMAGE_DIR = '/images/';
	const width = 125;
	const height = 125;
	const router = useRouter();

	const menuOptions: MenuOptionType[] = [
		{
			text: 'Dicionário',
			link: 'dicionario',
			image: IMAGE_DIR + 'dic.svg',
			height,
			width,
		},
		{
			text: 'Gramática',
			link: 'gramatica',
			image: IMAGE_DIR + 'gramatica.svg',
			height,
			width,
		},
		{
			text: 'Suporte',
			link: 'suporte',
			image: IMAGE_DIR + 'suporte.svg',
			height,
			width,
		},
		{
			text: 'Provérbios',
			image: IMAGE_DIR + 'proverbios.svg',
			link: 'proverbio',

			height,
			width,
		},
		{
			text: 'Sobre',
			link: 'sobre',

			image: IMAGE_DIR + 'sobre.svg',
			height,
			width,
		},
		{
			text: 'Fórum',
			link: 'forum',

			image: IMAGE_DIR + 'forum.svg',
			height,
			width,
		},
	];
	return (
		<AuthProvider>
			<>
				<Menu /* foto={data?.foto} */ />
				<div className="mx-auto my-[5rem] w-[60%]   grid grid-cols-3 gap-6 content-center  text-center">
					{menuOptions.map(
						({ height, image, text, link, width }, id) => (
							<section className="block" key={id}>
								<Image
									src={image}
									onClick={() => {
										router.push(link);
									}}
									width={width}
									height={height}
									alt="image"
									className="mx-auto scale-75 duration-500 hover:cursor-pointer hover:scale-100 ease-in-out"
								/>
								<span className="w-full relative font-normal text-normal  text-primaryBlue ">
									{text}
								</span>
							</section>
						)
					)}
				</div>
				<Footer />
			</>
		</AuthProvider>
	);
}
