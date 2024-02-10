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
	type: alternatives;
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
export interface IArtigo {
	numeroPaginas: number;
	setNumeroPaginas: (e: string) => void;
}
export interface ITese {
	grau: string;
	setGrau: (e: string) => void;
	nomeInstituicao: string;
	setNomeInstituicao: (e: string) => void;
}
export interface ILivro {
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
	idLingua: {
		lingua: string;
		id: number;
	};
	idBibliografia: {
		id_bibliografia: number;
		nome_autor: string;
		sobrenome_autor: string;
		titulo: string;
		ano: number;
	};
}
