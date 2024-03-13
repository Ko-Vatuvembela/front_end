import Image from 'next/image';
import { LOADING_IMAGE } from './components/shared/resources';

export default function Loading () {
	return (
		<div className="w-ful h-full mt-[10rem]">
			<div className="flex justify-center">
				<Image
					alt="Background Image"
					src={LOADING_IMAGE}
					width={128}
					height={128}
					className="mx-auto mt-10"
				/>
			</div>
			<div className="flex justify-center">
				<h1>Vamos esperar um pouco.</h1>
			</div>
		</div>
	);
}
