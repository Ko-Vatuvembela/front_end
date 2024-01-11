'use client';
import { Header } from '@/app/components/shared/header/Header';
import { Footer } from '@/app/components/shared/Footer';
import { BackgroundImage } from '@/app/components/shared/BackgroundImage';
import { type ILayout } from '@/app/components/types';
export const LayoutPattern = ({
	children,
	backgroundImage,
	optionalStyle,
}: ILayout) => {
	return (
		<div className={optionalStyle}>
			<Header />
			{children}
			<BackgroundImage
				source={backgroundImage}
				height={540}
				width={500}
			/>
			<Footer />
		</div>
	);
};
