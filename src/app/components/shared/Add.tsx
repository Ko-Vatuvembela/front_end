import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { type IAdd } from '../types';

const SIZE = 48;

export const Add = ({ type, url = '#' }: IAdd) => {
	const description = new Map<string, string>();
	description.set('gramatica', 'a gramática');
	description.set('dicionario', 'ao dicionário');
	description.set('proverbio', 'aos proverbios');

	const router = useRouter();
	return (
		<div
			className="flex hover:cursor-pointer w-fit scale-100 duration-500  hover:scale-110 ease-in-out my-1"
			onClick={() => {
				router.replace(url);
			}}
		>
			<Image
				className=""
				src={'/images/add.svg'}
				width={SIZE}
				height={SIZE}
				alt="Back"
			/>
			<span className="mt-3 mx-1">
				Adicionar conteúdo {description.get(type)}
			</span>
		</div>
	);
};
