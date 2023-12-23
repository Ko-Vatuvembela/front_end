'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { type LanguageType } from '@/app/components/types';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useEffect, useState } from 'react';
import FetchRequest from '@/app/provider/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { TextLink } from '@/app/components/shared/Link';

export default function Contribuir() {
	const router = useRouter();
	const query = useSearchParams().get('languageID');
	const [languageID, updateLanguage] = useState<number>();

	useEffect(() => {
		if (
			query === null ||
			!Number.isSafeInteger(Number(query)) ||
			Number(query) < 1
		) {
			router.push('/signed-in/home');
		}
		updateLanguage(Number(query));
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="drum">
				<div className="max-lg:w-[95%]  mx-auto ">{languageID}</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
