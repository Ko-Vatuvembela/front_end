/* */
import { Roboto_Serif } from 'next/font/google';
import { Title } from '../Title';
import { useState } from 'react';
import { decode } from 'he';
import { type IQuote, type ILanguage } from '../../types';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { QuotesProvider } from '@/app/context/QuotesProvider';
import { NoContent } from './NoContent';

const robotoSerif = Roboto_Serif({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export const Proverbios = () => {
	const all: ILanguage = { id: 200, lingua: 'Todas' };
	const [languageList, setLanguageList] = useState<ILanguage[]>([]);
	const [quotes, setQuotes] = useState<IQuote[]>([]);
	const [filteredQuotes, filterQuotes] = useState<IQuote[]>([]);
	const [language, setLanguage] = useState<ILanguage>(all);

	const aditional =
		language.id === all.id
			? ' em todas as línguas'
			: ` em ${language.lingua}`;

	return (
		<LanguageProvider
			languages={languageList}
			setLanguages={setLanguageList}
		>
			<QuotesProvider
				quotes={quotes}
				setQuotes={setQuotes}
				filterQuotes={filterQuotes}
			>
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

						<section className="proverbios text-justify">
							{filteredQuotes.length
? (
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
							)
: (
								<NoContent />
							)}
						</section>
					</div>
				</form>
			</QuotesProvider>
		</LanguageProvider>
	);
};
