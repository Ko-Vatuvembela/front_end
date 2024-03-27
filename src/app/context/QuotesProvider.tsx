import { createContext, useEffect } from 'react';
import { type IQuote } from '../components/types';
import { useRouter } from 'next/navigation';
import SessionProvider from '../provider/session';
import FetchRequest from '../provider/api';
import {
	UNAUTHORIZED,
	OK,
	INTERNAL_SERVER_ERROR_PAGE,
} from '../components/shared/resources';

const request = new FetchRequest();
const QuoteContext = createContext<IQuote[]>([]);
const session = new SessionProvider();

export const QuotesProvider = ({
	children,
	quotes,
	setPages,
	filterQuotes,
	setQuotes,
}: {
	setQuotes: (e: IQuote[]) => void
	setPages: (e: number[]) => void
	filterQuotes?: (e: IQuote[]) => void
	pages: number[]
	quotes: IQuote[]
	children: React.ReactNode
}) => {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const reqQuotes = await request.get('quotes/page/1');
				if (reqQuotes.status === UNAUTHORIZED) {
					session.deleteSession();
					router.replace('/');
				} else if (reqQuotes.status === OK) {
					const quotesList = await reqQuotes.json();
					setQuotes(quotesList.data as IQuote[]);
					const arr: number[] = [];
					const maxElements = quotesList.meta.total as number;
					for (let i = 1; i <= maxElements; i++) {
						arr.push(i);
					}
					setPages(arr);
					if (filterQuotes) {
						filterQuotes(quotesList.data);
					}
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);
	return (
		<QuoteContext.Provider value={quotes}>{children}</QuoteContext.Provider>
	);
};
