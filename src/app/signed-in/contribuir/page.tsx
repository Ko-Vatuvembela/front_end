'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useRouter, useSearchParams } from 'next/navigation';
import { Grammar } from '@/app/components/shared/body/Grammar';
import { Quotes } from '@/app/components/shared/body/Quotes';
import { Dictionary } from '@/app/components/shared/body/Dictionary';
import { useEffect } from 'react';
import { Back } from '@/app/components/shared/Back';

export default function Contribuir () {
	const paramList = ['dicionario', 'gramatica', 'proverbio'];
	const router = useRouter();
	const tipo = useSearchParams().get('tipo');

	useEffect(() => {
		if (!paramList.includes(tipo as string)) {
			router.replace('/error/404');
		}
	}, []);
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="mapa">
				<div>
					{tipo === 'dicionario' && <Dictionary />}
					{tipo === 'gramatica' && <Grammar />}
					{tipo === 'proverbio' && <Quotes />}
					<Back />
				</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
