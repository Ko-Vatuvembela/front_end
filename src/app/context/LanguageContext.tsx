import { createContext, useEffect } from 'react';
import { type ILanguage } from '../components/types';
import { useRouter } from 'next/navigation';
import FetchRequest from '../provider/api';
import {
	UNAUTHORIZED,
	OK,
	INTERNAL_SERVER_ERROR_PAGE,
} from '../components/shared/resources';

const request = new FetchRequest();
const LanguageContext = createContext<ILanguage[]>([]);

export const LanguageProvider = ({
	children,
	languages,
	languagesIDHash,
	languagesToString,
	selectLanguage,
	selectedLanguage,
	setLanguagesToString,
	setLanguages,
	setLanguageHash,
}: {
	children: React.ReactNode
	languages: ILanguage[]
	selectedLanguage?: string
	languagesIDHash?: Map<string, number>
	languagesToString?: string[]
	setLanguagesToString?: (e: string[]) => void
	selectLanguage?: (e: string) => void
	setLanguageHash?: (e: Map<string, number>) => void
	setLanguages: (e: ILanguage[]) => void
}) => {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const cache = JSON.parse(
				localStorage.getItem('languages') as string
			) as ILanguage[];

			if (cache === null) {
				try {
					const req = await request.get('lingua');
					if (req.status === UNAUTHORIZED) {
						sessionStorage.clear();
						router.replace('/');
					} else if (req.status === OK) {
						const list = (await req.json()) as ILanguage[];
						localStorage.setItem('languages', JSON.stringify(list));
						setLanguages(list);
						if (selectLanguage) {
							selectLanguage(list[0].lingua);
						}
						if (setLanguagesToString) {
							const hash = new Map<string, number>();
							setLanguagesToString(
								list.map(({ lingua, id }) => {
									hash.set(lingua, id);
									return lingua;
								})
							);
							if (setLanguageHash) {
								setLanguageHash(hash);
							}
						}
					}
				} catch (e) {
					router.replace(INTERNAL_SERVER_ERROR_PAGE);
				}
			} else {
				setLanguages(cache);
				const hash = new Map<string, number>();
				if (selectLanguage) {
					selectLanguage(cache[0].lingua);
				}
				if (setLanguagesToString) {
					setLanguagesToString(
						cache.map(({ lingua, id }) => {
							hash.set(lingua, id);
							return lingua;
						})
					);
					if (setLanguageHash) {
						setLanguageHash(hash);
					}
				}
			}
		})();
	}, []);
	return (
		<LanguageContext.Provider value={languages}>
			{children}
		</LanguageContext.Provider>
	);
};
