'use client';
import { AuthProvider /* AuthContext */ } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useEffect, useState } from 'react';
import { type LanguageType } from '@/app/components/types';
import FetchRequest from '@/app/provider/api';

const fetchR = new FetchRequest();

export default function Dicionario() {
	const [linguagens, setLinguagens] = useState<LanguageType[]>();
	useEffect(() => {
		(async function getLanguages() {
			try {
				const req = await fetchR.get('lingua');
				const listaTemporaria = (await req.json()) as LanguageType[];
				// const lista: LanguageType[] = [];
				const lista = listaTemporaria.map(
					{ id, lingua }:Langu =>{
						id,lingua
					});
						
				//setLinguagens(lista);
				console.log(lista, linguagens);
			} catch (e) {
				console.error(e);
			}
		})();
	}, []);
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
