'use client';
import { Button } from '@/app/components/shared/body/forms/Button';
import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { TextLink } from '@/app/components/shared/Link';
import { InputText } from '@/app/components/shared/body/forms/InputText';
import FetchRequest from '@/app/provider/api';
import SessionProvider from '@/app/provider/session';
import { signedURL } from '@/app/components/shared/resources';
import { useRouter } from 'next/navigation';
import { IsLogged } from '@/app/components/middleware/IsLogged';
const fetchRequest = new FetchRequest();
const session = new SessionProvider();

export const IndexPage = () => {
	const [email, updateEmail] = useState<string>();
	const [loadingStyle, setStyle] = useState<string>('hidden');
	const [errorMessage, updateErrorMessage] = useState<string>();
	const [password, updatePassword] = useState<string>();
	const router = useRouter();

	const imageSize = 56;
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = { email, password };
		setStyle('');
		const request = await fetchRequest.post('auth/login', data);
		setStyle('hidden');
		if (request) {
			if (request.status === 401) {
				updateErrorMessage('Usuário e/ou senha inválidos !!');
			} else if (request.status === 200) {
				updateErrorMessage('');
				const { token, user } = await request.json();
				user.token = token;
				session.setUserData(user);
				router.push(signedURL);
			}
		} else {
			router.replace('/error/connection');
		}
	};

	return (
		<IsLogged>
			<>
				<div className="mx-auto">
					<h1 className="text-primaryBlue text-4xl my-8 font-light text-center">
						Um lugar para partilharmos conhecimentos e entendermos
						melhor as nossas raízes.
					</h1>
				</div>
				<div className="md:flex md:justify-around w-full mt-20">
					<section className="p-8 md:w-[50%]">
						<form
							action="#"
							method="post"
							autoComplete="true"
							name="login"
							// eslint-disable-next-line
							onSubmit={handleSubmit}
						>
							<InputText
								label="Email"
								isRequired={true}
								name="email"
								optinalStyle="border-primaryBlue"
								placeholder="email@dominio.com"
								type="email"
								onChange={(e) => {
									updateEmail(e);
								}}
							/>
							<InputText
								label="Password"
								isRequired={true}
								name="password"
								optinalStyle="border-primaryBlue"
								placeholder="*********"
								type="password"
								onChange={(e) => {
									updatePassword(e);
								}}
							/>
							<Button
								text={'Entrar'}
								style="w-full mt-3"
								backgroundColor="bg-primaryBlue"
								isActive={true}
								textColor="text-white"
								hoverColor="hover:bg-secondaryBlue"
							/>
							{errorMessage && (
								<p className=" text-red-700 my-2">
									{errorMessage}
								</p>
							)}
						</form>
						<Image
							alt="Background Image"
							src={'/images/loading.svg'}
							width={128}
							height={128}
							className={loadingStyle}
						/>
						<p className="my-3">
							<TextLink
								href={'public/forgotpassword'}
								optinalStyle="text-primaryBlue"
								text="Esqueceu a senha ?"
							/>
						</p>
						<p>
							<TextLink
								href={'public/signup'}
								optinalStyle="text-primaryBlue"
								text="Crie uma conta"
							/>
						</p>
					</section>
					<div className="block">
						<Image
							alt="quote"
							src="/images/quotes.svg"
							width={imageSize}
							height={imageSize}
						/>
						<div className="flex justify-center text-center">
							<p className="text-5xl font-extralight text-primaryBlue w-[80%] text-justify italic">
								Intsi ko kwata ,tyengo tya na mema
							</p>
						</div>
						<Image
							alt="quote"
							src="/images/quotes.svg"
							width={imageSize}
							height={imageSize}
							className="rotate-180 float-right mb-5"
						/>
						<p className=" text-base text-primaryBlue mt-12 ml-5">
							{' '}
							- Ditado popular Ngangela
						</p>
					</div>
				</div>
			</>
		</IsLogged>
	);
};
