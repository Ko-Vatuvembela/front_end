import FetchRequest from '@/app/provider/api';
import SessionProvider from '@/app/provider/session';
const session = new SessionProvider();

export const getHeaders = (): Headers => {
	const headers = new Headers({ 'Content-Type': 'application/json' });
	if (session.isAuthenticated()) {
		const token = session.getUserData()?.token;
		headers.append('Authorization', `Bearer ${token}`);
	}
	return headers;
};
export function capitalize (e: string) {
	return e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
}
export function filterNumbers (e: string): string {
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
