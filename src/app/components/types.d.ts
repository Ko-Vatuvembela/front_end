/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type ReactNode } from 'react';

export const alternatives: string = 'dicionario' | 'gramatica' | 'proverbio';

export interface IInput {
	placeholder: string;
	name: string;
	value?: string;
	onChange: (e: string) => void;
	label: string;
	isRequired: boolean;
	optinalStyle?: string;
	type: 'email' | 'password' | 'text';
}
export interface IInputNumber {
	name: string;
	value?: string;
	onChange: (e: string) => void;
	label: string;
	isRequired: boolean;
	optinalStyle?: string;
	min: number;
	max?: number;
	step: number;
}

export interface IButton {
	text: string;
	style?: string;
	backgroundColor?: string;
	textColor?: string;
	onClick?: () => void | Promise<void>;
	image?: string;
	imageSide?: 'left' | 'right';
	id?: string;
	isActive?: boolean;
	hoverColor?: string;
}
export interface ILink {
	text: string;
	onClick?: () => void;
	optinalStyle?: string;
	href: string;
}
export interface IBackgroundImage {
	width: number;
	height: number;
	source: string;
}
export interface ILayout {
	backgroundImage: string;
	optionalStyle?: string;
	children: ReactNode;
}

export interface IUser {
	nome: string;
	sobrenome: string;
	email: string;
	foto: string;
	ativada: boolean;
	token?: string;
	uid: number;
}
export interface IUpdateUser {
	nome?: string;
	sobrenome?: string;
	email?: string;
	foto?: string;
	ativada?: boolean;
	token?: string;
}
export interface ISession {
	token: string;
	data: Date;
}
export interface IMenuOption {
	image: string;
	link: string;
	width: number | 128;
	height: number | 128;
	text: string;
}
export interface ILanguage {
	lingua: string;
	id: number;
}
export interface IAdd {
	url: string;
	type: 'dicionario' | 'gramatica' | 'proverbio';
}
export interface ISelectBox {
	values: string[];
	name: string;
	titulo: string;
	onChange: (e: string) => void;
	style?: string;
}
export interface IBibliografia {
	titulo: string;
	tipo: string;
	nomeAutor: string;
	sobrenomeAutor: string;
	ano: number;
	tipo: string;
	setNomeAutor: (e: string) => void;
	setTitulo: (e: string) => void;
	setSobrenomeAutor: (e: string) => void;
	setAno: (e: string) => void;
}
export interface IFormArtigo {
	numeroPaginas: number;
	setNumeroPaginas: (e: string) => void;
}
export interface IFormTese {
	grau: string;
	setGrau: (e: string) => void;
	nomeInstituicao: string;
	setNomeInstituicao: (e: string) => void;
}
export interface IFormLivro {
	editora: string;
	setEditora: (e: string) => void;
	localPublicacao: string;
	setLocalPublicacao: (e: string) => void;
	edicao: number;
	setEdicao: (e: string) => void;
}
export interface IPost {
	id_postagem: number;
	titulo: string;
}

export interface IPostDetailed {
	data: [
		{
			id_postagem: number;
			categoria: string;
			bibliografia_fk: number;
			utilizador_fk: number;
			lingua_fk: number;
			conteudo: string;
			titulo: string;
			uid: {
				nome: string;
				sobrenome: string;
				uid: number;
			};
			idBibliografia: {
				id_bibliografia: number;
				nome_autor: string;
				tipo: string;
				sobrenome_autor: string;
				titulo: string;
				ano: number;
			};
		},
	];
	artigo?: {
		bibliografia_fk: number;
		numero_paginas: number;
	};
	livro?: {
		bibliografia_fk: number;
		editora: string;
		local_publicacao: string;
		edicao: number;
	};
	tese?: {
		bibliografia_fk: number;
		grau: string;
		nome_instituicao: string;
	};
}
export interface IReferenciaBibiografica {
	idBibliografia: {
		id_bibliografia: number;
		nome_autor: string;
		tipo: string;
		sobrenome_autor: string;
		titulo: string;
		ano: number;
	};
	livro?: ILivro;
	artigo?: IArtigo;
	tese?: ITese;
}
export interface IArtigo {
	bibliografia_fk: number;
	numero_paginas: number;
}
export interface ITese {
	bibliografia_fk: number;
	grau: string;
	nome_instituicao: string;
}
export interface ILivro {
	bibliografia_fk: number;
	editora: string;
	local_publicacao: string;
	edicao: number;
}
export interface IQuote {
	id_proverbio: number;
	proverbio: string;
	lingua_fk: number;
}
export interface IDetailedQuote {
	proverbio: {
		id_proverbio: number;
		proverbio: string;
		explicacao: string;
		data: string;
		utilizador_fk: number;
		lingua_fk: number;
		uid: {
			nome: string;
			sobrenome: string;
			uid: number;
		};
	};
	lingua: string;
}
export interface ISingleQuote {
	proverbio: string;
	lingua: string;
}
export interface IPalavra {
	id_palavra: number;
	palavra: string;
	lingua_fk: number;
}
export interface ISignificado {
	id_significado: number;
	significado: string;
	exemplo: string;
	classe_gramatical_fk: number;
	utilizador_fk: number;
	palavra_fk: number;
	idPalavra: {
		id_palavra: number;
		palavra: string;
		lingua_fk: number;
	};
	idClasseGramatical: {
		id_classe_gramatical: number;
		classe_gramatical: string;
	};
}
