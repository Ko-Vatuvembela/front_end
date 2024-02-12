import { Roboto_Serif } from 'next/font/google';
import { Title } from '../Title';
import { useEffect, useState } from 'react';
import FetchRequest from '@/app/provider/api';
import router from 'next/router';
import { type ILanguage } from '../../types';
import { UNAUTHORIZED, OK, INTERNAL_SERVER_ERROR_PAGE } from '../resources';

const robotoSerif = Roboto_Serif({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
const request = new FetchRequest();

export const Proverbios = () => {
	const all: ILanguage = { id: 200, lingua: 'Todas' };
	const [languageList, setLanguageList] = useState<ILanguage[]>([]);
	const [language, setLanguage] = useState<ILanguage>(all);

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get('lingua');
				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = (await req.json()) as ILanguage[];
					setLanguageList(list);
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);
	const aditional =
		language.id === all.id
			? ' em todas as línguas'
			: ` em ${language.lingua}`;

	return (
		<div>
			<Title
				style={robotoSerif.className}
				text={`Provérbios ${aditional}`}
			/>
			<form action="" method="post">
				<div className="flex">
					<section className="filter w-[30%] block ">
						<p className="text-lg font-medium">Língua:</p>
						{languageList.map(({ id, lingua }, index) => (
							<div className="block" key={index}>
								<input
									key={id}
									type="radio"
									name="lingua"
									id={`checkbox${index}`}
									value={lingua}
									className="mr-2 checkbox"
									onClick={(e) => {
										setLanguage({ id, lingua });
									}}
								/>
								<label
									htmlFor={`checkbox${index}`}
									className="font-normal italic "
									key={index + 1}
								>
									{lingua}
								</label>
							</div>
						))}
						<input
							className="my-2 underline hover:cursor-pointer"
							type="reset"
							value="Limpar"
							onClick={() => {
								setLanguage(all);
							}}
						/>
					</section>
				</div>
			</form>
			<section className="proverbios"></section>
		</div>
	);
};
