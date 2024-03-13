'use client';

import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { type ILanguage } from '@/app/components/types';
import { useEffect, useState } from 'react';
import { TextLink } from '@/app/components/shared/Link';
import { Roboto } from 'next/font/google';
import { Add } from '@/app/components/shared/Add';
import { Back } from '@/app/components/shared/Back';

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
export default function Dicionario () {
	const [langs, updateList] = useState<ILanguage[]>([]);
	const [languageID, setLanguageID] = useState<string>('');

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
						<div className="form">
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
							<p className="text-3xl max-sm:text-center  my-8 max-md-text-center">
								Ou navegue por ordem alfabética
							</p>
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
