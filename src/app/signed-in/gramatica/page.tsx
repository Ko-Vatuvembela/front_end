'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { SelectLanguage } from '@/app/components/shared/body/SelectLanguage';
export default function NewComponent() {
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="vaso">
				<div>
					<p className="text-3xl max-sm:text-center font-light my-8 max-md-text-center">
						Selecione algum tópico da gramática e a língua
					</p>
					<SelectLanguage />
				</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
