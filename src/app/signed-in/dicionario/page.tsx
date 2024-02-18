'use client';

import { PageUnderContruction } from '@/app/components/shared/body/Building';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';

// import FetchRequest from '@/app/provider/api';
// import { type ILanguage } from '@/app/components/types';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { TextLink } from '@/app/components/shared/Link';
// import {
// 	INTERNAL_SERVER_ERROR_PAGE,
// 	OK,
// 	UNAUTHORIZED,
// } from '@/app/components/shared/resources';
// const request = new FetchRequest();

// const letters = [
// 	'A',
// 	'B',
// 	'C',
// 	'D',
// 	'E',
// 	'F',
// 	'G',
// 	'H',
// 	'I',
// 	'J',
// 	'K',
// 	'L',
// 	'M',
// 	'N',
// 	'O',
// 	'P',
// 	'R',
// 	'S',
// 	'T',
// 	'U',
// 	'V',
// 	'W',
// 	'X',
// 	'Y',
// 	'Z',
// ];

export default function Dicionario () {
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="bubu">
				<PageUnderContruction />
			</LayoutPattern>
		</AuthProvider>
	);
	// const router = useRouter();
	// const [langs, updateList] = useState<ILanguage[]>([]);
	// const [languageID, setLanguageID] = useState<string>('');
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const req = await request.get('lingua');
	// 			if (req.status === UNAUTHORIZED) {
	// 				sessionStorage.clear();
	// 				router.replace('/');
	// 			} else if (req.status === OK) {
	// 				const list = await req.json();
	// 				updateList(list);
	// 				setLanguageID(list[0].id);
	// 			}
	// 		} catch (e) {
	// 			router.replace(INTERNAL_SERVER_ERROR_PAGE);
	// 		}
	// 	})();
	// }, []);
	// return (
	// 	<AuthProvider>
	// 		<LayoutPattern backgroundImage="drum">
	// 			<div className="max-lg:w-[95%]  mx-auto ">
	// 				<p className="text-3xl max-sm:text-center font-light my-8 max-md-text-center">
	// 					Faça alguma pesquisa no nosso dicionário
	// 				</p>
	// 				<div className="form">
	// 					<label
	// 						htmlFor="lingua"
	// 						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
	// 					>
	// 						Selecione a língua
	// 					</label>
	// 					<select
	// 						name="linguagem"
	// 						id="lingua"
	// 						onChange={(e) => {
	// 							setLanguageID(e.currentTarget.value);
	// 						}}
	// 						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	// 					>
	// 						{langs.map(({ id, lingua }) => (
	// 							<option key={id} value={id}>
	// 								{lingua}
	// 							</option>
	// 						))}
	// 						;
	// 					</select>
	// 					<p className="text-3xl max-sm:text-center font-light my-8 max-md-text-center">
	// 						Ou navegue por ordem alfabética
	// 					</p>
	// 					<section className="my-5 flex flex-wrap justify-center">
	// 						{letters.map((value, id) => (
	// 							<TextLink
	// 								key={id}
	// 								text={value}
	// 								href={`dicionario/${languageID}/${value}`}
	// 								optinalStyle="bg-primaryBlue text-white py-4 px-6 m-2 text-lg text-center rounded-lg rounded"
	// 							/>
	// 						))}
	// 					</section>
	// 				</div>
	// 				<TextLink
	// 					href={
	// 						'/signed-in/dicionario/contribuir?languageID=' +
	// 						languageID
	// 					}
	// 					text="Ou clique aqui para adicionar alguma palavra/significado ao dicionário"
	// 				/>
	// 			</div>
	// 		</LayoutPattern>
	// 	</AuthProvider>
	// );
}
