'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
	INTERNAL_SERVER_ERROR_PAGE,
	NOT_FOUND,
	OK,
	UNAUTHORIZED,
} from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';
import { Back } from '@/app/components/shared/Back';

const request = new FetchRequest();

export default function NewComponent() {
	const router = useRouter();
	const postID = useSearchParams().get('id');

	useEffect(() => {
		// (async () => {
		// 	try {
		// 		const req = await request.get(`post/categorias/${postID}`);
		// 		if (req.status === UNAUTHORIZED) {
		// 			sessionStorage.clear();
		// 			router.replace('/');
		// 		} else if (req.status === OK) {
		// 			// const list = (await req.json()) as IPost[];
		// 			// console.log(list);
		// 			// setPosts(list);
		// 		} else {
		// 			router.replace(NOT_FOUND);
		// 		}
		// 	} catch (e) {
		// 		router.replace(INTERNAL_SERVER_ERROR_PAGE);
		// 	}
		// })();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div className="text-gray-700"></div>
				<Back />
			</LayoutPattern>
		</AuthProvider>
	);
}
