/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { type FormEvent, useState } from 'react';
import { InputText } from '@/app/components/shared/body/forms/InputText';
import { LayoutPattern } from '../LayoutPattern';
import { Button } from '@/app/components/shared/body/forms/Button';
import { TextLink } from '@/app/components/shared/Link';
import FetchRequest from '@/app/provider/api';
import Image from 'next/image';
import { capitalize } from '@/app/components/shared/resources';
import { redirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';

const fetchRequest = new FetchRequest();

export default function SignUpPage() {
	const [nome, updateNome] = useState<string>('');
	const [loadingStyle, setStyle] = useState<string>('hidden');
	const [sobrenome, updateSobrenome] = useState<string>('');
	const [email, updateEmail] = useState<string>('');
	const [password, updatePassword] = useState<string>('');
	const [errorMessage, updateErrorMessage] = useState<string>('');
	const [confirmPassword, updateConfirmPassword] = useState<string>('');

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		updateEmail(email.toLocaleLowerCase());

		if (password === confirmPassword && password.length >= 7) {
			const data = { email, password, nome, sobrenome };
			setStyle('');
			const request = await fetchRequest.post('public/user', data);
			setStyle('hidden');
			if (request.status === 409) {
				updateErrorMessage(`O email ${email} já existe.`);
			} else if (request.status === 500) {
				// INTERNAL SERVER
			} else if (request.status === 201) {
				localStorage.setItem('email', email);
				redirect('/public/verify', RedirectType.replace);
			}
		} else {
			updateErrorMessage(
				'As senhas não são iguais ou não possuem o comprimento mínimo.'
			);
		}
	};

	return (
		<>
			<LayoutPattern
				backgroundImage="bubu"
				optionalStyle="mobile:w-[90%] md:w-[60%] lg:w-[40%]  mx-auto"
			>
				<h1 className="text-primaryBlue text-4xl my-8 font-light text-center">
					Crie uma conta
				</h1>
				<form
					method="post"
					name="criarcontaform"
					className="my-8"
					onSubmit={handleSubmit}
				>
					<InputText
						onChange={(e) => {
							updateNome(capitalize(e));
						}}
						isRequired={true}
						label="Primeiro Nome"
						placeholder="Ex. Cykolomwenyo"
						type="text"
						name="nome"
					/>
					<InputText
						onChange={(e) => {
							updateSobrenome(capitalize(e));
						}}
						isRequired={true}
						label="Último nome"
						placeholder="Ex. Mwana"
						type="text"
						name="sobrenome"
					/>
					<InputText
						onChange={(e) => {
							updateEmail(e);
						}}
						isRequired={true}
						label="E-mail"
						placeholder="Ex. MwanaCykolomwenyo@dominio.com"
						type="email"
						name="email"
					/>
					<InputText
						onChange={(e) => {
							updatePassword(e);
						}}
						isRequired={true}
						label="Senha"
						placeholder="************************"
						type="password"
						name="password"
					/>
					<InputText
						onChange={(e) => {
							updateConfirmPassword(e);
						}}
						isRequired={true}
						label="Confirme a senha"
						placeholder="************************"
						type="password"
						name="confirmpassword"
					/>
					<Button
						backgroundColor="bg-primaryBlue"
						style="w-full"
						isActive={true}
						text="Cadastrar"
						textColor="text-white"
						hoverColor="hover:bg-secondaryBlue"
					/>
					{errorMessage && (
						<p className=" text-red-700 my-2">{errorMessage}</p>
					)}
				</form>
				<Image
					alt="Background Image"
					src={'/images/loading.svg'}
					width={128}
					height={128}
					className={loadingStyle}
				/>
				<TextLink
					href="/"
					text="Retroceder"
					optinalStyle="text-primaryBlue mb-8"
				/>
			</LayoutPattern>
		</>
	);
}
