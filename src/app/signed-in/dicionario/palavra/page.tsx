'use client';

import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import FetchRequest from '@/app/provider/api';
import { type ISignificado } from '@/app/components/types';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
	INTERNAL_SERVER_ERROR_PAGE,
	LOADING_STRING,
	NOT_FOUND,
	OK,
	UNPROCESSABLE_ENTITY,
	capitalize,
} from '@/app/components/shared/resources';
import { Back } from '@/app/components/shared/Back';
import { Roboto_Serif } from 'next/font/google';

const request = new FetchRequest();
const robotoSerif = Roboto_Serif({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default function Palavra () {
	const router = useRouter();
	const [significados, setSignificados] = useState<ISignificado[]>([]);
	const [palavra, setPalavra] = useState<string>(LOADING_STRING);
	const [pronuncia, setPronuncia] = useState<string>('...');
	const languageID = Number(useSearchParams().get('IDLingua'));
	const wordID = Number(useSearchParams().get('IDPalavra'));

	useEffect(() => {
		if (
			!Number.isSafeInteger(languageID) ||
			!Number.isSafeInteger(wordID)
		) {
			router.push(NOT_FOUND);
		}

		(async () => {
			const req = await request.get(`dictionary/${wordID}`);
			if (req.status === OK) {
				const result = (await req.json()) as ISignificado[];
				if (result.length === 0) {
					router.replace(NOT_FOUND);
				}
				setSignificados(result);
				setPalavra(result[0].idPalavra.palavra);
				setPronuncia(result[0].idPalavra.pronuncia);
			} else if (req.status === UNPROCESSABLE_ENTITY) {
				router.replace(NOT_FOUND);
			} else {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="knife">
				<div className={robotoSerif.className + ' my-5'}>
					<section className="flex -mb-1">
						<span className="text-[2rem] font-medium">
							{capitalize(palavra)}
						</span>
						<span className="text-[1.8rem] ml-2 font-medium text-primaryBlue">
							/{pronuncia}/
						</span>
					</section>
					<hr />
					<ul className="list-decimal">
						{significados.map(
							(
								{ significado, idClasseGramatical, exemplo },
								index
							) => (
								<li className="mb-3" key={index}>
									<span className="font-bold">
										{idClasseGramatical.classe_gramatical}{' '}
									</span>
									<span className="">{significado}</span>{' '}
									<br />
									<span className="italic">
										Exemplo: {exemplo}
									</span>
									<hr />
								</li>
							)
						)}
					</ul>
				</div>
				<Back />
			</LayoutPattern>
		</AuthProvider>
	);
}
