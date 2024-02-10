'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { type IPost } from '@/app/components/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
	INTERNAL_SERVER_ERROR_PAGE,
	OK,
	UNAUTHORIZED,
} from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';
import { Back } from '@/app/components/shared/Back';
import { Post } from '@/app/components/shared/body/Posts';
import { NoContent } from '@/app/components/shared/body/NoContent';

const request = new FetchRequest();

export default function Categoria() {
	const router = useRouter();
	const categoria = useSearchParams().get('categoria');
	const languageID = useSearchParams().get('languageID');
	const languageName = useSearchParams().get('languageName');

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
					const list = (await req.json()) as IPost[];
					console.log(list);
					setPosts(list);
				} else {
					router.replace('/not-found');
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);

	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div className="text-gray-700">
					<h1 className="text-4xl font-bold">
						{categoria} em {languageName}
					</h1>
					<hr />
					<div className="mt-3 mb-8">
						{posts.length === 0 ? (
							<NoContent />
						) : (
							posts.map((value, index) => (
								<Post {...value} key={index} />
							))
						)}
					</div>
				</div>
				<Back />
			</LayoutPattern>
		</AuthProvider>
	);
}
