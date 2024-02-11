import { type IReferenciaBibiografica } from '../../types';

export const ReferenciaBibiografica = ({
	tese,
	artigo,
	livro,
	idBibliografia,
}: IReferenciaBibiografica) => {
	const { ano, nome_autor, sobrenome_autor, tipo, titulo } = idBibliografia;
	const style = 'text-base';
	return (
		<div className="my-3">
			{tipo === 'Tese' && (
				<p className={style}>
					{sobrenome_autor}, {nome_autor}. {titulo}. Tese de{' '}
					{tese?.grau}, {tese?.nome_instituicao}, {ano}.
				</p>
			)}
			{tipo === 'Livro' && (
				<p className={style}>
					{sobrenome_autor}, {nome_autor}. {titulo}. {livro?.edicao}ª
					Edição. {livro?.local_publicacao}. {livro?.editora}, {ano}.
				</p>
			)}
			{tipo === 'Artigo' && (
				<p className={style}>
					{sobrenome_autor}, {nome_autor}. {titulo},{' '}
					{artigo?.numero_paginas} páginas, {ano}.
				</p>
			)}
		</div>
	);
};
