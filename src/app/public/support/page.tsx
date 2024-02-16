'use client';
import { Back } from '@/app/components/shared/Back';
import { LayoutPattern } from '../LayoutPattern';
import { Title } from '@/app/components/shared/Title';

export default function Support () {
	return (
		<>
			<LayoutPattern backgroundImage="elephant">
				<div>
					<Title text="Suporte" />
					<p className="text-base text-justify">
						Esta plataforma se encontra em constante
						desenvolvimento, e os conteúdos dependem de um esforço
						comunitário, pois as línguas pertencem ao povo. Eis as
						diversas formas de contribuir:
					</p>
					<ul className="text-gray-900 mb-8 list-decimal ml-8">
						<li className="text-base">
							Se tiver algum material em alguma língua (
							<span className="italic">
								Ex: Livro, gramática, dicionário, etc
							</span>
							), não hesite em contactar-nos.
						</li>
						<li className="text-base">
							Se conhecer algum lugar que venda algum material em
							alguma língua (
							<span className="italic">
								Ex: Alguma loja ou livraria, ou algum outro
								local
							</span>
							), não hesite em contactar-nos.
						</li>
						<li className="text-base">
							Se quiser contribuir com alguma doação financeira ou
							algum patrocínio de modo a melhorarmos os serviços,
							não hesite em contactar-nos.
						</li>
					</ul>
					<Back />
				</div>
			</LayoutPattern>
		</>
	);
}
