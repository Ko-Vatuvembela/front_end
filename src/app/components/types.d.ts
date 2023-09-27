/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type ReactNode } from 'react';

export interface InputType {
	placeholder: string;
	name: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	isRequired: boolean;
	optinalStyle?: string;
	type: 'email' | 'password' | 'text';
}

export interface ButtonType {
	text: string;
	style?: string;
	backgroundColor: string;
	textColor: string;
	image?: string;
	imageSide?: 'left' | 'right';
	id?: string;
	isActive: boolean;
	hoverColor: string;
}
export interface LinkType {
	text: string;
	optinalStyle?: string;
	href: string;
}
export interface BackgroundImageType {
	width: number;
	height: number;
	source: string;
}
export interface LayoutType {
	backgroundImage: string;
	optionalStyle?: string;
	children: ReactNode;
}

export interface UserType {
	nome: string;
	sobrenome: string;
	email: string;
	foto: string;
	uid: number;
}
export interface SessionType {
	token: string;
	data: Date;
}
