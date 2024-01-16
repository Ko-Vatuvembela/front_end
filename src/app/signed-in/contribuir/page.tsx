'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useRouter, useSearchParams } from 'next/navigation';
import { Grammar } from '@/app/components/shared/body/Grammar';
import { Quotes } from '@/app/components/shared/body/Quotes';
import { Dictionary } from '@/app/components/shared/body/Dictionary';
import { useEffect } from 'react';
import { Back } from '@/app/components/shared/Back';
import { h1 } from '@/app/components/shared/resources';

export default function NewComponent() {
	const paramList = ['dicionario', 'gramatica', 'proverbio'];

	const router = useRouter();
	const tipo = useSearchParams().get('tipo');

	useEffect(() => {
		if (!paramList.includes(tipo as string)) {
			router.replace('/error/404');
		}

		// (async () => {
		// 	try {
		// 		const req = await request.get(
		// 			`post/categorias/${tipo}/${languageID}`
		// 		);
		// 		if (req.status === UNAUTHORIZED) {
		// 			sessionStorage.clear();
		// 			router.replace('/');
		// 		} else if (req.status === OK) {
		// 			const list = await req.json();
		// 			setPosts(list);
		// 		}
		// 	} catch (e) {
		// 		router.replace('/error/500');
		// 	}
		// })();
	}, []);
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div>
					<h1 className={h1}>Example</h1>
					{tipo === 'dicionario' && <Dictionary />}
					{tipo === 'gramatica' && <Grammar />}
					{tipo === 'proverbio' && <Quotes />}
					<Back />
				</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
