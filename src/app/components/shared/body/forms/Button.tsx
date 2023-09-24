import { type ButtonType } from '@/app/components/types';

import Image from 'next/image';

export const Button = ({ style, text, textColor, imageSide, image, backgroundColor, id, isActive, hoverColor }: ButtonType) => {
    return (
        <button className={` ${style} ${isActive && 'hover:cursor-pointer'} ${!isActive && 'opacity-50'}  `} >
            <section className="flex" >
                <div className={`${textColor} flex justify-center  font-semibold w-full text-[14px] ${backgroundColor} rounded-[14px] px-[32px] py-[14px] ${isActive && hoverColor}`} >
                    {image && imageSide === 'left' && <Image alt="Logo" className="mr-3" width={14} height={14} src={image} />}
                    {text}
                    {image && imageSide === 'right' && <Image alt="Logo" className="ml-3" width={14} height={14} src={image} />}
                </div>
            </section>
        </button>
    );
};
