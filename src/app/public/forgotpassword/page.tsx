'use client';
import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { InputText } from '@/app/components/shared/body/forms/InputText';
import { Button } from '@/app/components/shared/body/forms/Button';
import Image from 'next/image';
import FetchRequest from '@/app/provider/api';

export default function ForgotPassword() {
	const router = useRouter();
	const [loadingStyle, setStyle] = useState<string>('hidden');
	const [errorMessage, updateErrorMessage] = useState<string>();
	const [email, updateEmail] = useState('');

	const handleSubmit = async (event: FormEvent): Promise<void> => {
		const fetchRequest = new FetchRequest();
		event.preventDefault();
		const data = { email };
		setStyle('');
		const request = await fetchRequest.post('mail/send_code', data);
		setStyle('hidden');
		if (request) {
			if (request.status === 404) {
				updateErrorMessage('O email ' + email + ' não existe!!');
			} else if (request.status === 422) {
				updateErrorMessage('Insira os dados corretamente !!');
			} else if (request.status === 200) {
				updateErrorMessage('');
				localStorage.setItem('email', email);
				router.replace('/public/verify');
			}
		} else {
			router.replace('/error/connection');
		}
	};
	return (
		<LayoutPattern backgroundImage="drum">
			<div className="mx-auto w-[80%]">
				<h1 className="text-primaryBlue text-4xl my-8 font-light text-center">
					Recuperação da senha
				</h1>

				<div className="w-[50%] mx-auto">
					<form action="#" method="post" onSubmit={handleSubmit}>
						<InputText
							isRequired={true}
							onChange={(e) => {
								updateEmail(e);
							}}
							type="email"
							label="Insira o email"
							name="email"
							placeholder="email@dominio.com"
							value={email}
						/>
						<Button
							hoverColor="hover:bg-secondaryBlue"
							backgroundColor="bg-primaryBlue"
							text="Confirmar"
							id="botao"
							style={'w-full'}
							textColor="text-white"
						/>
					</form>
					<Image
						alt="Background Image"
						src={'/images/loading.svg'}
						width={128}
						height={128}
						className={loadingStyle}
					/>
					{errorMessage && (
						<p className=" text-red-700 my-2">{errorMessage}</p>
					)}
				</div>
			</div>
		</LayoutPattern>
	);
}
