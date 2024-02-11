'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import parse from 'html-react-parser';

import {
	INTERNAL_SERVER_ERROR_PAGE,
	NOT_FOUND,
	OK,
	UNAUTHORIZED,
	styles,
} from '@/app/components/shared/resources';
import FetchRequest from '@/app/provider/api';
import { Back } from '@/app/components/shared/Back';
import { type IPostDetailed } from '@/app/components/types';
import { Roboto_Serif } from 'next/font/google';
import { ReferenciaBibiografica } from '@/app/components/shared/body/Referencias';

const request = new FetchRequest();

const robotoSerif = Roboto_Serif({
	style: ['normal', 'italic'],
	weight: ['100', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

export default function NewComponent () {
	const router = useRouter();
	const postID = useSearchParams().get('id');
	const [post, updatePost] = useState<IPostDetailed>();

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get(`post/${postID}`);
				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = (await req.json()) as IPostDetailed;
					updatePost(list);
				} else {
					router.replace(NOT_FOUND);
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);
	if (post) {
		return (
			<AuthProvider>
				<LayoutPattern backgroundImage="arvore">
					<div className={`text-gray-700 ${robotoSerif.className}`}>
						<h1 className="text-3xl">{post.data[0].titulo}</h1>
						<hr />
						<p className="text-sm my-2">
							{parse(String(post.data[0].conteudo), {
								replace: (elem) => {
									if (elem.type === 'tag') {
										const { attribs, name } = elem;
										Object.assign(attribs, {
											class: styles.get(name),
										});
									}
								},
							})}
						</p>
						<h1 className="text-3xl my-2">
							Referências bibliográficas
						</h1>
						<hr />
						<ReferenciaBibiografica
							idBibliografia={post.data[0].idBibliografia}
							artigo={post.artigo}
							livro={post.livro}
							tese={post.tese}
						/>
					</div>
					<Back />
				</LayoutPattern>
			</AuthProvider>
		);
	}
}
