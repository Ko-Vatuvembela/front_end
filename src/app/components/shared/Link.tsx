import Link from 'next/link';
import { type LinkType } from '../types';
export const TextLink = ({ href, text, optinalStyle }: LinkType) => {
    return (
        <Link href={href} className={'hover:underline text-base ' + optinalStyle} >{text}</Link>
    );
};
