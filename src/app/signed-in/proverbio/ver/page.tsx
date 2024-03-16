'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { Back } from '@/app/components/shared/Back';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Title } from '@/app/components/shared/Title';
import { type IDetailedQuote } from '@/app/components/types';
import {
	INTERNAL_SERVER_ERROR_PAGE,
	LOADING_STRING,
	NOT_FOUND,
	OK,
	UNAUTHORIZED,
} from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';
import { Roboto_Serif } from 'next/font/google';

const request = new FetchRequest();
const robotoSerif = Roboto_Serif({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
export default function Proverbio () {
	const id = Number(useSearchParams().get('id'));
	const router = useRouter();
	const [titulo, setTitulo] = useState<string>(LOADING_STRING);
	const [quote, setQuote] = useState<IDetailedQuote>();

	useEffect(() => {
		if (!Number.isSafeInteger(id)) {
			router.push(NOT_FOUND);
		}
		(async () => {
			try {
				const req = await request.get(`quotes/${id}`);

				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = (await req.json()) as IDetailedQuote;
					setQuote(list);
					setTitulo(`Provérbio em ${list?.lingua}`);
				} else {
					router.replace(NOT_FOUND);
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	});
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="earrings">
				<Title text={titulo} />
				<p
					className={`italic text-justify my-2 text-md ${robotoSerif.className} text-gray-950`}
				>
					{quote?.proverbio.proverbio &&
						parse(quote.proverbio.proverbio)}
				</p>
				<p
					className={
						'font-normal text-justify my-2 text-md text-gray-700'
					}
				>
					{quote?.proverbio.explicacao}
				</p>
				<p
					className={
						'font-normal float-right italic my-2 text-md text-gray-500'
					}
				>
					Postado por {quote?.proverbio.uid.nome}{' '}
					{quote?.proverbio.uid.sobrenome} em {quote?.proverbio.data}
				</p>
				<div className="my-8"></div>
				<Back />
			</LayoutPattern>
		</AuthProvider>
	);
}
