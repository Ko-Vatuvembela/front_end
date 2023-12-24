'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { type LanguageType } from '@/app/components/types';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { categorias } from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';

const request = new FetchRequest();

export default function NewComponent () {
	const unselectedStyle =
		'm-2 bg-slate-500 text-white p-3 rounded-lg border border-slate-500 hover:bg-white hover:cursor-pointer hover:text-slate-500';
	const selectedStyle =
		'm-2 bg-primaryBlue text-white p-3 rounded-lg border border-primaryBlue hover:cursor-pointer hover:bg-white hover:text-primaryBlue';

	const [langs, updateList] = useState<LanguageType[]>([]);

	const [selectedLanguage, updateLanguage] = useState('Todas');
	const selectedCategory = useRef('');

	const selectLanguage = (index: number) => {
		const linguasDiv = document.querySelector('.linguas');
		if (linguasDiv) {
			const selectedElement = linguasDiv.children[index];
			if (selectedElement.className === selectedStyle) {
				selectedElement.className = unselectedStyle;
				updateLanguage('Todas');
			} else {
				selectedElement.className = selectedStyle;
				updateLanguage(langs[index].lingua);
			}

			for (let i = 0; i < linguasDiv.children.length; i++) {
				const elem = linguasDiv.children[i];
				if (i !== index) {
					elem.className = unselectedStyle;
				}
			}
		}
	};
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get('lingua');

				if (req.status === 401) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === 200) {
					const list = (await req.json()) as LanguageType[];
					list.unshift({ id: 15, lingua: 'Todas' });
					updateList(list);
				}
			} catch (e) {
				router.replace('/error/500');
			}
		})();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div>
					<p className="text-3xl text-center font-light my-8 max-md-text-center">
						Selecione a língua
					</p>
					<div className="flex flex-wrap justify-center linguas">
						{langs.map(({ lingua }, id) => (
							<span
								className={unselectedStyle}
								key={id}
								onClick={() => {
									selectLanguage(id);
								}}
							>
								{lingua}
							</span>
						))}
					</div>
					<p className="text-3xl font-light my-8 text-center">
						Clique sobre o tópico que deseja pesquisar
					</p>
					<div className="flex  flex-wrap justify-center">
						{categorias.map(({ nome, descricao }, id) => {
							return (
								<div
									className="max-w-sm rounded overflow-hidden hover:cursor-pointer hover:shadow-lg m-2"
									key={id}
									onClick={(e) => {
										selectedCategory.current =
											categorias[id].nome;
										e.currentTarget.className =
											'max-w-sm rounded overflow-hidden hover:cursor-pointer shadow-lg m-2';
										setTimeout(() => {
											console.log(
												selectedLanguage,
												selectedCategory.current
											); // Redirecionar para a página
										}, 1000);
									}}
								>
									<div className="px-6 py-4">
										<div className="font-bold text-xl mb-2">
											{nome}
										</div>
										<p className="text-gray-700 text-base text-justify">
											{descricao}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</LayoutPattern>
		</AuthProvider>
	);
}