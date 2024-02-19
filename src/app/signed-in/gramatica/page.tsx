'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { type ILanguage } from '@/app/components/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CATEGORIAS, categorias } from '@/app/components/shared/resources';
import { Back } from '@/app/components/shared/Back';
import { Add } from '@/app/components/shared/Add';
import { SelectBox } from '@/app/components/shared/body/forms/Select';
import { Button } from '@/app/components/shared/body/forms/Button';
import { Title } from '@/app/components/shared/Title';
import {
	// LanguageContext,
	LanguageProvider,
} from '@/app/context/LanguageContext';

export default function NewComponent () {
	const [languageObjs, updateLanguageObjs] = useState<ILanguage[]>([]);
	const [selectedLanguage, selectLanguage] = useState<string>();
	const [languageStrings, updateLanguageStrings] = useState<string[]>([]);
	const [languageHash, setLanguageHash] = useState<Map<string, number>>();
	const router = useRouter();
	const contributionType = 'gramatica';
	const [category, updateCategory] = useState(CATEGORIAS[0]);
	const categoryHash = new Map<string, string>();

	categoryHash.set(categorias[0].nome, categorias[0].descricao);
	categoryHash.set(categorias[1].nome, categorias[1].descricao);
	categoryHash.set(categorias[2].nome, categorias[2].descricao);
	categoryHash.set(categorias[3].nome, categorias[3].descricao);

	useEffect(() => {
		if (languageObjs.length > 0) {
			updateLanguageStrings(languageObjs.map(({ lingua }) => lingua));
		}
	}, []);

	const search = () => {
		const id = languageHash?.get(selectedLanguage as string);
		const URL = `/signed-in/gramatica/categoria?categoria=${category}&languageID=${id}&languageName=${selectedLanguage}`;
		router.push(URL);
	};

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<LanguageProvider
					languages={languageObjs}
					setLanguageHash={setLanguageHash}
					languagesIDHash={languageHash}
					languagesToString={languageStrings}
					selectedLanguage={selectedLanguage}
					selectLanguage={selectLanguage}
					setLanguagesToString={updateLanguageStrings}
					setLanguages={updateLanguageObjs}
				>
					<div className="">
						<Title text="Gramática" />
						<section className="flex justify-center my-2">
							<div>
								<div>
									<SelectBox
										name="lingua"
										titulo="Selecione a língua"
										values={languageStrings}
										onChange={selectLanguage}
									/>
								</div>

								<div className="my-2">
									<SelectBox
										name="categoria"
										titulo="Selecione a categoria"
										values={CATEGORIAS}
										onChange={updateCategory}
									/>
								</div>
							</div>
						</section>
						<p className="text-gray-700 text-base text-justify mt-2 mb-8">
							{categoryHash.get(category)}
						</p>
						<section className="flex justify-center">
							<Button text="Pesquisar" onClick={search} />
						</section>
						<Add
							type={contributionType}
							url={`/signed-in/contribuir?tipo=${contributionType}`}
						/>
						<Back />
					</div>
				</LanguageProvider>
			</LayoutPattern>
		</AuthProvider>
	);
}
