'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import Image from 'next/image';
import { type IUser } from '@/app/components/types';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { Title } from '@/app/components/shared/Title';
import { Button } from '@/app/components/shared/body/forms/Button';
import { InputText } from '@/app/components/shared/body/forms/InputText';
import {
	OK,
	UNAUTHORIZED,
	UNPROCESSABLE_ENTITY,
	capitalize,
} from '@/app/components/shared/resources';
import { type FormEvent, useEffect, useState } from 'react';
import SessionProvider from '@/app/provider/session';
import FetchRequest from '@/app/provider/api';
import { Back } from '@/app/components/shared/Back';
import { useRouter } from 'next/navigation';
import { LoadingComponent } from '@/app/components/shared/body/LoadingComponent';

const session = new SessionProvider();
const request = new FetchRequest();

export default function Profile () {
	const userData = session.getUserData() as IUser;
	const router = useRouter();

	const [nome, updateNome] = useState<string>('');
	const [foto, updateFoto] = useState<string>('');
	const [sobrenome, updateSobrenome] = useState<string>('');
	const [email, updateEmail] = useState<string>('');
	const [isHidden, hide] = useState<boolean>(true);
	const [response, updateResponse] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		updateFoto(session.getUserPhoto());
		updateEmail(userData.email);
		updateNome(userData.nome);
		updateSobrenome(userData.sobrenome);
	}, []);

	const updateData = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const foto = form.get('foto') as File;

		const formData: Record<string, string> = {};

		for (const e of form.keys()) {
			if (e !== 'foto') {
				const value = String(form.get(e));
				if (value) {
					formData[e] = value;
				}
			}
		}
		if (formData) {
			hide(false);
			const req = await request.put('profile', 0, formData);

			if (req.status === OK) {
				session.updateUserData((await req.json()) as IUser);
				setIsError(false);
				hide(true);
				updateResponse('Dados actualizados com sucesso!');
			} else if (req.status === UNPROCESSABLE_ENTITY) {
				setIsError(true);
				updateResponse('Erro : Verifique os dados');
			} else if (req.status === UNAUTHORIZED) {
				localStorage.clear();
				sessionStorage.clear();
				router.replace('/');
			}
		}
		if (foto.size) {
			hide(false);
			const image = await request.uploadFile('profile', 'POST', form);
			if (image) {
				console.log(image.status);
				if (image.status === OK) {
					const newPhoto = (await image?.json()).foto;
					session.updateUserData({
						foto: newPhoto,
					});
					updateFoto(newPhoto);
					setIsError(false);
					hide(true);
					updateResponse('Foto actualizada !');
				} else if (image.status === UNAUTHORIZED) {
					localStorage.clear();
					sessionStorage.clear();
					router.replace('/');
				} else {
					setIsError(true);
					updateResponse(
						'Erro : Verifique o formato da imagem: jpeg, jpg ou png.'
					);
				}
			}
		}
	};

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="bubu">
				<Title text="Perfil do utilizador" />
				<form
					method="post"
					encType="multipart/form-data"
					className=" mx-auto sm:w-[80%] md:w-[50%] lg:w-[40%]"
					onSubmit={updateData}
				>
					<Image
						className="mx-auto rounded-full"
						loader={() => session.getUserPhoto()}
						src={foto}
						width={128}
						height={128}
						alt="Current user image"
					/>
					<input
						type="file"
						className="my-2"
						name="foto"
						id="foto"
						onChange={(e) => {
							// updateFoto(e.currentTarget.value);
						}}
					/>
					<InputText
						onChange={(e) => {
							updateNome(capitalize(e));
						}}
						isRequired={false}
						label="Primeiro Nome"
						placeholder={nome}
						// value={nome}
						type="text"
						name="nome"
					/>
					<InputText
						onChange={(e) => {
							updateSobrenome(capitalize(e));
						}}
						isRequired={false}
						label="Último nome"
						placeholder={sobrenome}
						// value={sobrenome}
						type="text"
						name="sobrenome"
					/>
					<InputText
						onChange={(e) => {
							updateEmail(e);
						}}
						isRequired={false}
						label="E-mail"
						placeholder={email}
						// value={email}
						type="email"
						name="email"
					/>
					<InputText
						onChange={() => {}}
						isRequired={false}
						label="Senha"
						placeholder="************************"
						type="password"
						name="password"
					/>
					<Button
						backgroundColor="bg-primaryBlue"
						style="w-full"
						isActive={true}
						text="Atualizar"
						textColor="text-white"
						hoverColor="hover:bg-secondaryBlue"
					/>
					<LoadingComponent hidden={isHidden} />
				</form>

				{
					<p
						className={`my-3 text-center ${
							isError ? 'text-red-500' : 'text-green-500'
						}`}
					>
						{response}
					</p>
				}
				<Back />
			</LayoutPattern>
		</AuthProvider>
	);
}
