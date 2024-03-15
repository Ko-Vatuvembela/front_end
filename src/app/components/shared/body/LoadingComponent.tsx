import Image from 'next/image';
import { LOADING_IMAGE } from '../resources';

export const LoadingComponent = ({ hidden = true }: { hidden: boolean }) => {
	const style = !hidden ? '' : 'hidden';
	return (
		<Image
			alt="Loading"
			src={LOADING_IMAGE}
			width={128}
			height={128}
			className={style + ' mx-auto'}
		/>
	);
};
