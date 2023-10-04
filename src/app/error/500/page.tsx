import { LayoutPattern } from '@/app/public/LayoutPattern';
import Image from 'next/image';
import Link from 'next/link';

export default function InternalServerError () {
	return (
		<LayoutPattern backgroundImage="bubu">
			<div className="text-center text-primaryBlue mx-auto w-[80%]">
				<section className="flex justify-center">
					<Image
						alt="Background Image"
						src={'/images/error_500.svg'}
						width={32}
						height={32}
						className="w-[30%]"
					/>
				</section>
				<h1 className=" text-4xl my-8 font-light text-justify">
					500 - Internal Server Error, pedimos desculpas por isto,
					estamos a trabalhar para consertar o sistema.{' '}
					<Link href={'/'} className="hover:underline">
						Voltar
					</Link>
				</h1>
			</div>
		</LayoutPattern>
	);
}
