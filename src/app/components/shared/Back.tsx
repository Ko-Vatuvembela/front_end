import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SIZE = 48;

export const Back = () => {
	const router = useRouter();
	return (
		<div
			className="flex hover:cursor-pointer w-fit scale-100 duration-500  hover:scale-110 ease-in-out my-1"
			onClick={() => {
				router.back();
			}}
		>
			<Image
				className=""
				src={'/images/voltar.svg'}
				width={SIZE}
				height={SIZE}
				alt="Voltar"
			/>
			<span className="mt-3 mx-1">Vutuka</span>
		</div>
	);
};
