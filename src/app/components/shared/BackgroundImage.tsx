import Image from "next/image";
import { BackgroundImageType } from "../types";

export const BackgroundImage = ({ source, width, height }: BackgroundImageType) => {
    const baseStyle = 'opacity-30 right-[16.7%] fixed -mt-[10%] -z-10 right-[0%] ';
    const xxl = '2xl:right-[16.7%] 2xl:-mt-[12.5%]';
    const xl = 'xl:-mt-[20%]';
    const lg = 'lg:-mt-[25%]';

    return (
        <Image
            alt="Background Image"
            src={"/images/" + source + ".svg"}
            width={width}
            height={height}
            className={`${baseStyle} ${xxl} ${xl} ${lg}`}
        />
    );
};