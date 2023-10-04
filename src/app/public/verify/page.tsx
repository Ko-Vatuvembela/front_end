/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { useState, useEffect } from 'react';
import { InputText } from '@/app/components/shared/body/forms/InputText';
import { LayoutPattern } from '../LayoutPattern';
import { Button } from '@/app/components/shared/body/forms/Button';
import { TextLink } from '@/app/components/shared/Link';
import Image from 'next/image';
import { sendMail } from '@/app/components/shared/resources';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export default function VerifyPage () {
	const email = localStorage.getItem('email');
	const [errorMessage, updateErrorMessage] = useState<string>('');

	useEffect(() => {
		if (email) {
			(async () => {
				if (!(await sendMail(email))) {
					updateErrorMessage(
						'Não foi possível enviar o e-mail. Tente novamente ou entre em contato com o administrador do sistema'
					);
				} else {
					localStorage.clear();
				}
			})();
		} else {
			redirect('/', RedirectType.replace);
		}
	}, []);
	return (
		<>
			<LayoutPattern
				backgroundImage="bubu"
				optionalStyle="mobile:w-[90%] md:w-[60%] lg:w-[40%]  mx-auto"
			>
				<h1 className="text-primaryBlue text-4xl my-8 font-light text-center">
					Verificação da conta
				</h1>
				<form
					method="post"
					name="verificarcontaform"
					className="my-8"
					// onSubmit={handleSubmit}
				>
					<InputText
						onChange={(e) => {
							// updateVerificationCode(e);
						}}
						isRequired={true}
						label="Insira o código de confirmação"
						placeholder="123456"
						type="text"
						name="nome"
					/>

					<Button
						backgroundColor="bg-primaryBlue"
						style="w-full"
						isActive={true}
						text="Confirmar"
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
					className={'loadingStyle'}
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
