import Image from 'next/image';
import { Back } from '../Back';

export const PageUnderContruction = () => {
	return (
		<div className="text-center text-primaryBlue mx-auto w-[80%]">
			<section className="flex justify-center">
				<Image
					alt="Background Image"
					src={'/images/build.svg'}
					width={32}
					height={32}
					className="w-[30%]"
				/>
			</section>
			<h1 className=" text-4xl my-8 font-bold text-center">
				Página em construção.
			</h1>
			<Back />
		</div>
	);
};
