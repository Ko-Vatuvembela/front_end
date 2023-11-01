import Link from 'next/link';
import { type LinkType } from '../types';
export const TextLink = ({ href, text, optinalStyle, onClick }: LinkType) => {
	return (
		<Link
			href={href}
			onClick={onClick}
			className={'hover:underline text-base ' + optinalStyle}
		>
			{text}
		</Link>
	);
};
