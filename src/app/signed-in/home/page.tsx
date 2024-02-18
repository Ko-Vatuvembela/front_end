'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { type ILanguage, type IMenuOption } from '@/app/components/types';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useEffect } from 'react';
import FetchRequest from '@/app/provider/api';
import {
	UNAUTHORIZED,
	OK,
	INTERNAL_SERVER_ERROR_PAGE,
} from '@/app/components/shared/resources';

const request = new FetchRequest();

export default function HomePage () {
	const IMAGE_DIR = '/images/';
	const width = 125;
	const height = 125;
	const router = useRouter();

	const menuOptions: IMenuOption[] = [
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

	useEffect(() => {
		(async () => {
			const languageList = JSON.parse(
				localStorage.getItem('languages') as string
			) as ILanguage[];
			if (languageList === null) {
				try {
					const req = await request.get('lingua');
					if (req.status === UNAUTHORIZED) {
						sessionStorage.clear();
						router.replace('/');
					} else if (req.status === OK) {
						const list = (await req.json()) as ILanguage[];
						localStorage.setItem('languages', JSON.stringify(list));
					}
				} catch (e) {
					router.replace(INTERNAL_SERVER_ERROR_PAGE);
				}
			}
		})();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="bubu">
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
			</LayoutPattern>
		</AuthProvider>
	);
}
