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
	// filteredQuotes,
	filterQuotes,
	setQuotes,
}: {
	setQuotes: (e: IQuote[]) => void
	filterQuotes?: (e: IQuote[]) => void
	quotes: IQuote[]
	// filteredQuotes?: IQuote[];
	children: React.ReactNode
}) => {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const reqQuotes = await request.get('quotes');

				if (reqQuotes.status === UNAUTHORIZED) {
					session.deleteSession();
					router.replace('/');
				} else if (reqQuotes.status === OK) {
					const quotesList = (await reqQuotes.json()) as IQuote[];
					setQuotes(quotesList);
					if (filterQuotes) {
						filterQuotes(quotesList);
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
