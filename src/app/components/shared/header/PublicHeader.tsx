import Image from 'next/image';
import Link from 'next/link';
export const PublicHeader = () => {
    return (
        <nav className="w-full">
            <Link href='/'>
                <Image className="mx-auto my-5" src={'/images/logo.svg'} width={253} height={50} alt="Logo image" />
            </Link>
        </nav>

    );
};
