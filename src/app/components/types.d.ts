/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type ReactNode } from 'react';

export interface IInput {
	placeholder: string;
	name: string;
	value?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	isRequired: boolean;
	optinalStyle?: string;
	type: 'email' | 'password' | 'text';
}

export interface IButton {
	text: string;
	style?: string;
	backgroundColor: string;
	textColor: string;
	onClick?: () => void | Promise<void>;
	image?: string;
	imageSide?: 'left' | 'right';
	id?: string;
	isActive?: boolean;
	hoverColor: string;
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
export interface IPost {
	idPostagem: number;
	categoria: string;
	conteudo: string;
	utilizadorFK: number;
	linguaFK: number;
}
