import Image from 'next/image';

export default function Loading () {
	return (
		<div className="w-ful h-full mt-[10rem]">
			<div className="flex justify-center">
				<Image
					alt="Background Image"
					src={'/images/loading.svg'}
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
