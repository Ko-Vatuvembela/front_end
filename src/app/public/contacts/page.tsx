'use client';
import { Back } from '@/app/components/shared/Back';
import { LayoutPattern } from '../LayoutPattern';
import { Title } from '@/app/components/shared/Title';

export default function Contacts () {
	return (
		<>
			<LayoutPattern backgroundImage="spear">
				<div>
					<Title text="Informações de contactos" />
					<ul className="text-gray-900 mb-8">
						<li className="text-base">
							<span className="font-bold">Email: </span>{' '}
							dev_developer@outlook.com
						</li>
						<li className="text-base">
							<span className="font-bold">LinkedIn: </span>{' '}
							<a
								href="https://www.linkedin.com/in/rodolfo-neves-937324158/"
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								{' '}
								Clique aqui
							</a>
						</li>
						<li className="text-base">
							<span className="font-bold">
								Link do WhatsApp:{' '}
							</span>{' '}
							<a
								href="https://wa.me/+556198314096"
								target="_blank"
								rel="noopener noreferrer"
								className="underline"
							>
								{' '}
								Clique aqui
							</a>
						</li>
					</ul>
					<Back />
				</div>
			</LayoutPattern>
		</>
	);
}
