'use client';
import FetchRequest from '@/app/provider/api';
import SessionProvider from '@/app/provider/session';
const session = new SessionProvider();

export const getHeaders = (
	contentType = { 'Content-Type': 'application/json' }
): Headers => {
	const headers = new Headers(contentType);
	if (session.isAuthenticated()) {
		const token = session.getUserData()?.token;
		headers.append('Authorization', `Bearer ${token}`);
	}
	return headers;
};
export const getUploadHeaders = (): Headers => {
	const headers = new Headers();
	if (session.isAuthenticated()) {
		const token = session.getUserData()?.token;
		headers.append('Authorization', `Bearer ${token}`);
	}
	return headers;
};
export function capitalize(e: string) {
	return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
}
export function filterNumbers(e: string): string {
	let ret = '';
	for (const a of e) {
		const tmp = Number(a);
		if (Number.isSafeInteger(tmp)) ret += a;
	}
	return ret;
}
export const sendMail = async (email: string): Promise<boolean> => {
	const request = await new FetchRequest().post('mail/send_code', {
		email,
	});
	return request?.status === 200;
};
export const signedURL = '/signed-in/home';
export const loginURL = '/';
export const RECOVER_PASSWORD = 'RRR';
export const ACTIVATE_ACCOUNT = 'AAA';
export const h1 = 'text-3xl text-center font-normal my-8 max-md-text-center';
export const categorias = [
	{
		nome: 'Fonologia',
		descricao:
			'A fonologia é um ramo da linguística que estuda como os sons da fala são organizados e utilizados em diferentes línguas. Em vez de focar nos significados das palavras, a fonologia analisa os padrões sonoros e como esses sons funcionam dentro de um sistema linguístico.',
	},
	{
		nome: 'Morfologia',
		descricao:
			'A morfologia é a área da linguística que se concentra no estudo das unidades mínimas de significado nas palavras, chamadas morfemas. Os morfemas são como os blocos de construção das palavras, e a morfologia explora como esses blocos são combinados para formar diferentes palavras. ',
	},
	{
		nome: 'Sintaxe',
		descricao:
			'A sintaxe é a parte da linguística que estuda a estrutura e a organização das frases. Em outras palavras, a sintaxe se preocupa com a forma como as palavras são combinadas para criar sentenças significativas. Ela analisa as relações gramaticais entre as palavras em uma frase e as regras que governam a ordem das palavras. ',
	},
	{
		nome: 'Diversos',
		descricao: 'Esta secção conterá assuntos diversos sobre a língua.',
	},
];

export const ALL_LANGUAGES = 200;
export const LOADING_STRING = 'A carregar';
export const UNAUTHORIZED = 401;
export const CONFLICT = 409;
export const CREATED = 201;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_FOUND = '/not-found';
export const OK = 200;
export const LOADING_IMAGE = '/images/loading.svg';
export const UNPROCESSABLE_ENTITY = 422;
export const ERROR_STYLE = 'text-red-500 font-bold';
export const SUCCESS_STYLE = 'text-green-500 font-normal';
export const niveis = ['Bacharelado/Licenciatura', 'Mestrado', 'Doutorado'];
export const INTERNAL_SERVER_ERROR_PAGE = '/error/500';
export const CATEGORIAS = ['Fonologia', 'Morfologia', 'Sintaxe'];
export const CLASSES_GRAMATICAIS = [
	'Adjetivo',
	'Advérbio',
	'Artigo',
	'Conjunção',
	'Interjeição',
	'Numeral',
	'Preposição',
	'Pronome',
	'Substantivo',
	'Verbo',
];

export const styles = new Map<string, string>();
styles.set('h2', 'text-4xl font-bold');
styles.set('h3', 'text-3xl font-bold');
styles.set('h4', 'text-2xl font-bold');
styles.set('ol', 'list-decimal');
styles.set('ul', 'list-disc');
styles.set('blockquote', 'italic');

export const DEFAULT_IMAGE = '/images/default.svg';
