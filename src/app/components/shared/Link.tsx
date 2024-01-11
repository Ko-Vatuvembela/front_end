import Link from 'next/link';
import { type ILink } from '../types';
export const TextLink = ({ href, text, optinalStyle, onClick }: ILink) => {
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
