'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { type ILanguage } from '@/app/components/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import {
	CATEGORIAS,
	INTERNAL_SERVER_ERROR_PAGE,
	OK,
	UNAUTHORIZED,
	categorias,
} from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';
import { Back } from '@/app/components/shared/Back';
import { Add } from '@/app/components/shared/Add';
import { SelectBox } from '@/app/components/shared/body/forms/Select';
import { Button } from '@/app/components/shared/body/forms/Button';

const request = new FetchRequest();

/*
setTimeout(() => {
											const URL = `/signed-in/gramatica/categoria?categoria=${selectedCategory.current}&lingua=${selectedLanguage}&desc=${selectedLanguage}`;
											router.push(URL);
										}, 1000);
*/
export default function NewComponent () {
	const languageHash = useRef<Map<string, number>>();
	const hash = new Map<string, number>();
	const contributionType = 'gramatica';
	const [langs, updateList] = useState<ILanguage[]>([]);
	const [selectedLanguage, updateLanguage] = useState('');
	const [category, updateCategory] = useState(CATEGORIAS[0]);
	const [languages, setLanguages] = useState<string[]>([]);
	const router = useRouter();
	const categoryHash = new Map<string, string>();

	categoryHash.set(categorias[0].nome, categorias[0].descricao);
	categoryHash.set(categorias[1].nome, categorias[1].descricao);
	categoryHash.set(categorias[2].nome, categorias[2].descricao);
	categoryHash.set(categorias[3].nome, categorias[3].descricao);

	const search = () => {
		const id = languageHash.current?.get(selectedLanguage);
		const URL = `/signed-in/gramatica/categoria?categoria=${category}&languageID=${id}&languageName=${selectedLanguage}`;
		router.push(URL);
	};

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get('lingua');

				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = (await req.json()) as ILanguage[];
					updateList(list);
					updateLanguage(langs[0].lingua);
					const tmpArr: string[] = [];

					for (const elem of list) {
						tmpArr.push(elem.lingua);
						hash.set(elem.lingua, elem.id);
					}
					setLanguages(tmpArr);
					languageHash.current = hash;
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div className="">
					<section className="flex justify-center">
						<div>
							<div>
								<SelectBox
									name="lingua"
									titulo="Selecione a língua"
									values={languages}
									onChange={updateLanguage}
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
			</LayoutPattern>
		</AuthProvider>
	);
}
