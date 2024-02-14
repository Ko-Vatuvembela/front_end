import Image from 'next/image';

export const LoadingComponent = ({ hidden = true }: { hidden: boolean }) => {
	const style = !hidden ? '' : 'hidden';
	return (
		<Image
			alt="Loading"
			src={'/images/loading.svg'}
			width={128}
			height={128}
			className={style + ' mx-auto'}
		/>
	);
};
