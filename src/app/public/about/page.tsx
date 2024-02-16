'use client';
import { Back } from '@/app/components/shared/Back';
import { LayoutPattern } from '../LayoutPattern';
import { Title } from '@/app/components/shared/Title';

export default function About () {
	const blue = 'text-primaryBlue';

	return (
		<>
			<LayoutPattern backgroundImage="scythe">
				<div>
					<Title text="Notas do autor" />
					<p className="text-base text-justify">
						Ko Vatuvembela{' '}
						<span className={'italic ' + blue}>/vatuvembelá/</span>,
						é uma expressão da língua Ngangela{' '}
						<span className={'italic ' + blue}>/Nganguela/</span>{' '}
						que interpreta a expressão{' '}
						<span className={'font-bold ' + blue}>
							de onde viemos ou nascemos.{' '}
						</span>
						Esta expressão diz respeito às nossas origens, e este
						projecto vem com este propósito, de trazer as
						informações sobre as nossas origens utilizando as
						tecnologias actuais. Este projeto providencia um
						repertório sobre as línguas nacionais de Angola,
						dependendo da contribuição da comunidade falante, pode
						ser usada para outras línguas de origem Africana . Além
						de enaltecer a cultura Africana em geral, este projecto
						representa um ponto de encontro entre aqueles que querem
						aprender uma determinada língua aqueles que sabem e
						possuem o desejo de ensinar uma determinada língua, ou
						de qualquer forma possuem interesse nas nossas línguas.
						<p className="my-1">
							Desejo muito que você usufrua desta plataforma,
							aprenda ao máximo e contribua para o desenvolvimento
							dela, pois este projecto foi criado pensando em
							Angola, e todos os Angolanos que amam a sua cultura
							e preocupam com ela.
						</p>
						<p className={'float-right ' + blue}>
							Brasília, aos 15 de Fevereiro de 2024
						</p>
						<br />
						<p className={'float-right ' + blue}>
							Rodolfo Cabral Neves
						</p>
					</p>
					<Back />
				</div>
			</LayoutPattern>
		</>
	);
}
