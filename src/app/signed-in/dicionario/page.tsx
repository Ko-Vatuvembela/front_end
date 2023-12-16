'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';

export default function Dicionario () {
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="drum">
				<p className="text-3xl font-light my-8">
					Faça alguma pesquisa no nosso dicionário
				</p>
				<div className="form">
					<select name="linguagem" id="">
						sss
					</select>
				</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
