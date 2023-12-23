'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Contribuir () {
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
