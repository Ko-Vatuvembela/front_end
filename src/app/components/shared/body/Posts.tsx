import { type IPost } from '../../types';
import { TextLink } from '../Link';

export const Post = ({ id_postagem, titulo }: IPost) => {
	const url = `/signed-in/gramatica/post?id=${id_postagem}`;
	return (
		<div className="mt-2">
			<TextLink href={url} text={titulo} key={id_postagem} />
		</div>
	);
};
