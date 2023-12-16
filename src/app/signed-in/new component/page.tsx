'use client';
import { AuthProvider /* AuthContext */ } from '@/app/context/AuthProvider';
import { LayoutPattern } from '@/app/public/LayoutPattern';

export default function NewComponent () {
	return (
		<AuthProvider>
			<LayoutPattern backgroundImage="bubu">
				<div>new component</div>
			</LayoutPattern>
		</AuthProvider>
	);
}
