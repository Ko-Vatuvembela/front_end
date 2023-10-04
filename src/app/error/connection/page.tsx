import { LayoutPattern } from '@/app/public/LayoutPattern';
import Image from 'next/image';
import Link from 'next/link';

export default function ConnectionError() {
	return (
		<LayoutPattern backgroundImage="bubu">
			<div className="text-center text-primaryBlue mx-auto w-[80%]">
				<section className="flex justify-center">
					<Image
						alt="Background Image"
						src={'/images/err_connection.svg'}
						width={32}
						height={32}
						className="w-[30%]"
					/>
				</section>
				<h1 className=" text-4xl my-8 font-light text-justify">
					Erro de conexão com o servidor, não foi possível se conectar
					ao servidor de dados.{' '}
					<Link href={'#'} className="hover:underline">
						Tentar de novo
					</Link>
				</h1>
			</div>
		</LayoutPattern>
	);
}
