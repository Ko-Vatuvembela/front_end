'use client';
import { AuthProvider } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';
import { Back } from '@/app/components/shared/Back';
import { Add } from '@/app/components/shared/Add';
import { Proverbios } from '@/app/components/shared/body/Proverbio';

export default function Proverbio() {
	const contributionType = 'proverbio';
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="earrings">
				<Proverbios />
				<Add
					type={contributionType}
					url={`/signed-in/contribuir?tipo=${contributionType}`}
				/>
				<Back />
			</LayoutPattern>
		</AuthProvider>
	);
}
