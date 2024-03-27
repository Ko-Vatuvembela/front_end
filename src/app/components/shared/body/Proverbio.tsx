/* */
import { Roboto_Serif } from 'next/font/google';
import { Title } from '../Title';
import { useEffect, useState } from 'react';
import { decode } from 'he';
import { type IQuote, type ILanguage } from '../../types';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { NoContent } from './NoContent';
import { useRouter } from 'next/navigation';
import {
	OK,
	INTERNAL_SERVER_ERROR_PAGE,
	MAX_ELEMENTS_PER_PAGE,
} from '../resources';
import FetchRequest from '@/app/provider/api';

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
	const [pages, setPages] = useState<number[]>([]);
	const [selectedPage, selectPage] = useState<number>(1);
	const [quotes, setQuotes] = useState<IQuote[]>([]);
	const [filteredQuotes, filterQuotes] = useState<IQuote[]>([]);
	const [language, setLanguage] = useState<ILanguage>(all);
	const router = useRouter();

	const getQuotes = async (page: number) => {
		try {
			const reqQuotes = await request.get(`quotes/page/${page}`);
			if (reqQuotes.status === OK) {
				const quotesList = await reqQuotes.json();
				const allQuotes = quotesList.data as IQuote[];
				setQuotes(allQuotes);
				filterQuotes(allQuotes);
				const arr: number[] = [];
				const total = quotesList.meta.total as number;
				const maxElements =
					Math.floor(total / MAX_ELEMENTS_PER_PAGE) + 1;

				for (let i = 1; i <= maxElements; i++) {
					arr.push(i);
				}
				setPages(arr);
			}
		} catch (e) {
			router.replace(INTERNAL_SERVER_ERROR_PAGE);
		}
	};

	useEffect(() => {
		(async () => {
			await getQuotes(selectedPage);
		})();
	}, []);

	const aditional =
		language.id === all.id
			? ' em todas as línguas'
			: ` em ${language.lingua}`;

	return (
		<LanguageProvider
			languages={languageList}
			setLanguages={setLanguageList}
		>
			<div>
				<Title text={`Provérbios ${aditional}`} />
				<form action="" method="post">
					<div className=" lg:flex">
						<section className="filter md:w-[30%] block ">
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
										onClick={() => {
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

						<section className="proverbios text-justify">
							{filteredQuotes.length ? (
								filteredQuotes.map(
									({ proverbio, id_proverbio }, index) => {
										const LIMIT = 50;
										const tmp = decode(proverbio);
										const phrase =
											tmp.length > LIMIT
												? tmp.slice(0, LIMIT) + '...'
												: tmp;
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
								)
							) : (
								<NoContent />
							)}
						</section>
					</div>
					<div className="my-3 mx-auto justify-center p-1 flex   ">
						{pages.map((value, index) => (
							<div
								className="  text-primaryBlue hover:cursor-pointer hover:underline "
								onClick={async (e) => {
									selectPage(Number(value));
									await getQuotes(value);
								}}
								key={index}
							>
								<span
									className={`p-3 mx-2 ${
										selectedPage === Number(value) &&
										'rounded bg-primaryBlue text-white'
									}`}
								>
									{value}
								</span>
							</div>
						))}
					</div>
				</form>
			</div>
		</LanguageProvider>
	);
};
