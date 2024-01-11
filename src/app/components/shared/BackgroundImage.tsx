import Image from 'next/image';
import { type IBackgroundImage } from '../types';

export const BackgroundImage = ({
	source,
	width,
	height,
}: IBackgroundImage) => {
	const baseStyle = 'opacity-30 blur-sm fixed -z-10 right-0 bottom-1';
	return (
		<div className="flex-row-reverse flex">
			<Image
				alt="Background Image"
				src={'/images/' + source + '.svg'}
				width={width}
				height={height}
				className={baseStyle}
			/>
		</div>
	);
};
