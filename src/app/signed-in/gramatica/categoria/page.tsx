'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { type IPost } from '@/app/components/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { OK, UNAUTHORIZED } from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';
import { Back } from '@/app/components/shared/Back';
import { NoContent } from '@/app/components/shared/body/NoContent';

const request = new FetchRequest();

export default function NewComponent () {
	const router = useRouter();
	const categoria = useSearchParams().get('categoria');
	const languageID = useSearchParams().get('lingua');
	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get(
					`post/categorias/${categoria}/${languageID}`
				);

				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = await req.json();
					setPosts(list);
				}
			} catch (e) {
				router.replace('/error/500');
			}
		})();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div>
					{posts.length === 0 && <NoContent />}
					<Back />
				</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
