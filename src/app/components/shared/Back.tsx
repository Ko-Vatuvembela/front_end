import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SIZE = 48;

export const Back = () => {
	const router = useRouter();
	return (
		<div className="relative left-0">
			<Image
				className="scale-75 duration-500 hover:cursor-pointer hover:scale-100 ease-in-out"
				src={'/images/voltar.svg'}
				width={SIZE}
				height={SIZE}
				alt="Back"
				onClick={() => {
					router.back();
				}}
			/>
		</div>
	);
};
