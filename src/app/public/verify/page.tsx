'use client';
import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { InputText } from '@/app/components/shared/body/forms/InputText';
import { Button } from '@/app/components/shared/body/forms/Button';
import { filterNumbers } from '@/app/components/shared/resources';
import Image from 'next/image';
import FetchRequest from '@/app/provider/api';

export default function VerifyAccount () {
	const router = useRouter();
	const [loadingStyle, setStyle] = useState<string>('hidden');
	const [errorMessage, updateErrorMessage] = useState<string>();
	const [verificationCode, updateVerificationCode] = useState('');
	const email = localStorage.getItem('email') as string;

	if (!email) {
		router.replace('/');
	}

	const handleSubmit = async (event: FormEvent): Promise<void> => {
		const fetchRequest = new FetchRequest();
		event.preventDefault();
		const data = { email, verificationCode };
		setStyle('');
		const request = await fetchRequest.post('mail/confirm_code', data);
		setStyle('hidden');
		if (request) {
			if (request.status === 404) {
				updateErrorMessage('O código de confirmação não existe!!');
			} else if (request.status === 422) {
				updateErrorMessage('Insira os dados corretamente !!');
			} else if (request.status === 200) {
				updateErrorMessage('');
				localStorage.clear();
				router.replace('/');
			}
		} else {
			router.replace('/error/connection');
		}
	};
	return (
		<LayoutPattern backgroundImage="drum">
			<div className="mx-auto w-[80%]">
				<h1 className="text-primaryBlue text-4xl my-8 font-light text-center">
					Activação de conta
				</h1>
				<p className="text-primaryBlue text-xl my-8 font-light text-center">
					Enviamos um código de confirmação para{' '}
					<span className="font-bold"> {email}</span>. Assim que o
					código for confirmado, você será redirecionado
					automaticamente para realizar o login.
				</p>
				<div className="w-[40%] mx-auto">
					<form action="#" method="post" onSubmit={handleSubmit}>
						<InputText
							isRequired={true}
							onChange={(e) => {
								updateVerificationCode(filterNumbers(e));
							}}
							type="text"
							label="Código de confirmação"
							name="codigo"
							placeholder="123456"
							value={verificationCode}
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
