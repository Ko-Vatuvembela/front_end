import { useState, useEffect } from 'react';
import { type LanguageType } from '../../types';
import FetchRequest from '@/app/provider/api';
import { useRouter } from 'next/navigation';

const request = new FetchRequest();

export const SelectLanguage = () => {
	const unselectedStyle =
		'm-2 bg-slate-500 text-white p-3 rounded-lg border border-slate-500 hover:bg-white hover:cursor-pointer hover:text-slate-500';
	const selectedStyle =
		'm-2 bg-primaryBlue text-white p-3 rounded-lg border border-primaryBlue hover:cursor-pointer hover:bg-white hover:text-primaryBlue';

	const [langs, updateList] = useState<LanguageType[]>([]);

	const [selectedLanguage, updateLanguage] = useState('Todas');

	const selectLanguage = (index: number) => {
		const linguasDiv = document.querySelector('.linguas');
		if (linguasDiv) {
			const selectedElement = linguasDiv.children[index];
			selectedElement.className =
				selectedElement.className === selectedStyle
					? unselectedStyle
					: selectedStyle;
			updateLanguage(langs[index].lingua);

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
		<div className="flex justify-center linguas">
			{langs.map(({ lingua }, id) => (
				<span
					className={unselectedStyle}
					key={id}
					onClick={() => {
						selectLanguage(id);
						console.log(selectLanguage);
					}}
				>
					{lingua}
				</span>
			))}
		</div>
	);
};
