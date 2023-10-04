import { LayoutPattern } from '@/app/public/LayoutPattern';
import { TextLink } from '@/app/components/shared/Link';

export default function NotFound () {
	return (
		<LayoutPattern backgroundImage="bubu">
			<div className="text-center text-primaryBlue">
				<h1 className=" text-4xl my-8 font-light ">
					404 - Não encontrado.
				</h1>
				<TextLink href="/" text="Clique aqui para voltar" />
			</div>
		</LayoutPattern>
	);
}
