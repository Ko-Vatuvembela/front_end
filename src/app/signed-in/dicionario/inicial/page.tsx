'use client';

import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { LanguageProvider } from '@/app/context/LanguageContext';
import FetchRequest from '@/app/provider/api';
import { type IPalavra, type ILanguage } from '@/app/components/types';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextLink } from '@/app/components/shared/Link';

import {
	INTERNAL_SERVER_ERROR_PAGE,
	NOT_FOUND,
	OK,
	UNPROCESSABLE_ENTITY,
} from '@/app/components/shared/resources';
import { Back } from '@/app/components/shared/Back';
import { Title } from '@/app/components/shared/Title';
const request = new FetchRequest();

export default function Inicial () {
	const router = useRouter();
	const languageID = Number(useSearchParams().get('languageID'));
	const inicial = useSearchParams().get('inicial');
	const [langs, updateList] = useState<ILanguage[]>([]);
	const [listaPalavras, updateListaPalavras] = useState<IPalavra[]>([]);
	const [languageHash, setLanguageHash] = useState<Map<number, string>>();

	useEffect(() => {
		if (!Number.isSafeInteger(languageID) || !inicial) {
			router.push(NOT_FOUND);
		}
		const tmp = new Map<number, string>();
		for (const e of langs) {
			tmp.set(e.id, e.lingua);
		}
		setLanguageHash(tmp);

		(async () => {
			const req = await request.get(
				`dictionary/all/${languageID}/${inicial}`
			);
			if (req.status === OK) {
				const result = (await req.json()) as IPalavra[];
				updateListaPalavras(result);
			} else if (req.status === UNPROCESSABLE_ENTITY) {
				router.replace(NOT_FOUND);
			} else {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, [langs]);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="knife">
				<LanguageProvider languages={langs} setLanguages={updateList}>
					<div className={' max-lg:w-[95%]  mx-auto '}>
						<Title
							text={`Palavras em ${languageHash?.get(
								languageID
							)} que
							começam com a letra ${inicial}`}
						/>
						<div className="my-2 leading-relaxed text-primaryBlue text-justify">
							{listaPalavras.length === 0 ? (
								<p className="text-xl">
									Não existem ainda palavras em{' '}
									{languageHash?.get(languageID)} que começam
									com a letra {inicial}. Pedimos as nossas
									sinceras desculpas. Estamos a trabalhar
									árduamente para proporcionar o conteúdo que
									deseja. Brevemente será adicionado ao nosso
									dicionário.
								</p>
							) : (
								listaPalavras.map(({ idPalavra }) => (
									<div key={idPalavra.id_palavra}>
										<TextLink
											href={`palavra?IDPalavra=${idPalavra.id_palavra}&IDLingua=${idPalavra.lingua_fk}`}
											text={idPalavra.palavra}
										/>
									</div>
								))
							)}
						</div>
						<Back />
					</div>
				</LanguageProvider>
			</LayoutPattern>
		</AuthProvider>
	);
}
