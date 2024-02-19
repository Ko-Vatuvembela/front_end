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
	setQuotes,
}: {
	setQuotes: (e: IQuote[]) => void
	quotes: IQuote[]
	children: React.ReactNode
}) => {
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const cache = JSON.parse(
				localStorage.getItem('quotes') as string
			) as IQuote[];

			if (cache === null) {
				try {
					const reqQuotes = await request.get('quotes');

					if (reqQuotes.status === UNAUTHORIZED) {
						session.deleteSession();
						router.replace('/');
					} else if (reqQuotes.status === OK) {
						const quotesList = (await reqQuotes.json()) as IQuote[];
						setQuotes(quotesList);
						localStorage.setItem(
							'quotes',
							JSON.stringify(quotesList)
						);
					}
				} catch (e) {
					router.replace(INTERNAL_SERVER_ERROR_PAGE);
				}
			} else {
				localStorage.setItem('quotes', JSON.stringify(cache));
			}
		})();
	}, []);
	return (
		<QuoteContext.Provider value={quotes}>{children}</QuoteContext.Provider>
	);
};
