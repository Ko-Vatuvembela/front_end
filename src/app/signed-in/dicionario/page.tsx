'use client';

import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { type IPalavra, type ILanguage } from '@/app/components/types';
import { useEffect, useState } from 'react';
import { TextLink } from '@/app/components/shared/Link';
import FetchRequest from '@/app/provider/api';
import { Roboto } from 'next/font/google';
import { Add } from '@/app/components/shared/Add';
import { Back } from '@/app/components/shared/Back';
import { InputText } from '@/app/components/shared/body/forms/InputText';

const request = new FetchRequest();

const letters = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

const roboto = Roboto({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
export default function Dicionario() {
	const [langs, updateList] = useState<ILanguage[]>([]);
	const [languageID, setLanguageID] = useState<string>('');
	const [results, setResults] = useState<IPalavra[]>([]);

	const searchWord = async (payload: string) => {
		if (payload) {
			const response = await request.get(`dictionary/search/${payload}`);
			setResults((await response.json()).data as IPalavra[]);
			console.log(results);
		} else {
			setResults([]);
		}
	};

	useEffect(() => {
		if (langs.length > 0) {
			setLanguageID(String(langs[0].id));
		}
	}, [langs]);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="drum">
				<LanguageProvider languages={langs} setLanguages={updateList}>
					<div
						className={
							roboto.className + ' max-lg:w-[95%]  mx-auto '
						}
					>
						<p className="text-3xl max-sm:text-center  my-8 max-md-text-center">
							Faça alguma pesquisa no nosso dicionário
						</p>
						<div className="search my-2">
							<InputText
								label="Pesquise"
								name="palavra"
								placeholder="Ex. Muxima"
								type="text"
								isRequired={true}
								onChange={(e) => {
									searchWord(e.trim());
								}}
							/>
							{results.length > 0 ? (
								<div className="p-3 bg-gray-200 rounded-lg -mt-4 max-h-[5rem] overflow-scroll">
									{results.map(
										(
											{ id_palavra, palavra, lingua_fk },
											index
										) => (
											<section key={index}>
												<TextLink
													href={`dicionario/palavra?IDPalavra=${id_palavra}&IDLingua=${lingua_fk}`}
													text={palavra}
												/>
											</section>
										)
									)}
								</div>
							) : (
								<div></div>
							)}
						</div>
						<div className="form">
							<p className="text-3xl max-sm:text-center  my-8 max-md-text-center">
								Ou navegue por ordem alfabética
							</p>
							<label
								htmlFor="lingua"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Selecione a língua
							</label>
							<select
								name="linguagem"
								id="lingua"
								onChange={(e) => {
									setLanguageID(e.currentTarget.value);
								}}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							>
								{langs.map(({ id, lingua }) => (
									<option key={id} value={id}>
										{lingua}
									</option>
								))}
								;
							</select>
							<section className="my-5 flex flex-wrap justify-center">
								{letters.map((value, id) => (
									<TextLink
										key={id}
										text={value}
										href={`dicionario/inicial?languageID=${languageID}&inicial=${value}`}
										optinalStyle="bg-primaryBlue text-white py-4 px-6 m-2 text-lg text-center rounded-lg rounded"
									/>
								))}
							</section>
						</div>
						<Add
							type="dicionario"
							url={'/signed-in/contribuir?tipo=dicionario'}
						/>
						<Back />
					</div>
				</LanguageProvider>
			</LayoutPattern>
		</AuthProvider>
	);
}
