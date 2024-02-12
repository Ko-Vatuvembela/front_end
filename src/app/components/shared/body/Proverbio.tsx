import { Roboto_Serif } from 'next/font/google';
import { Title } from '../Title';
import { useEffect, useState } from 'react';
import FetchRequest from '@/app/provider/api';
import { decode } from 'he';
import { useRouter } from 'next/navigation';
import { type IQuote, type ILanguage } from '../../types';
import { UNAUTHORIZED, OK, INTERNAL_SERVER_ERROR_PAGE } from '../resources';

const robotoSerif = Roboto_Serif({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
const request = new FetchRequest();

export const Proverbios = () => {
	const router = useRouter();
	const all: ILanguage = { id: 200, lingua: 'Todas' };
	const [languageList, setLanguageList] = useState<ILanguage[]>([]);
	const [quotes, setQuotes] = useState<IQuote[]>([]);
	const [filteredQuotes, filterQuotes] = useState<IQuote[]>([]);
	const [language, setLanguage] = useState<ILanguage>(all);

	useEffect(() => {
		(async () => {
			try {
				const reqLanguages = await request.get('lingua');
				const reqQuotes = await request.get('quotes');

				if (reqLanguages.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (reqLanguages.status === OK) {
					const list = (await reqLanguages.json()) as ILanguage[];
					setLanguageList(list);
				}
				if (reqQuotes.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (reqQuotes.status === OK) {
					const quotesList = (await reqQuotes.json()) as IQuote[];
					setQuotes(quotesList);
					filterQuotes(quotesList);
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
			<Title text={`Provérbios ${aditional}`} />
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
										filterQuotes(
											quotes.filter(
												({ lingua_fk }) =>
													lingua_fk === id
											)
										);
									}}
								/>
								<label
									htmlFor={`checkbox${index}`}
									className="font-normal italic"
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
								filterQuotes(quotes);
							}}
						/>
					</section>

					<section className="proverbios ">
						{filteredQuotes.map(
							({ proverbio, id_proverbio }, index) => {
								const LIMIT = 50;
								const p = decode(proverbio);
								const phrase = decode(
									p.length > LIMIT
										? p.slice(0, LIMIT) + '...'
										: p
								);
								return (
									<p
										className={`mt-2 italic ${robotoSerif.className}`}
										key={index}
									>
										{phrase}{' '}
										<a
											href={`/signed-in/proverbio/ver?id=${id_proverbio}`}
											className="font-normal hover:underline text-primaryBlue"
										>
											Ver mais
										</a>
									</p>
								);
							}
						)}
					</section>
				</div>
			</form>
		</div>
	);
};
