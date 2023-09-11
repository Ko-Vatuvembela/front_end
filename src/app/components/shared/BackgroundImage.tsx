import Image from "next/image";
import { BackgroundImageType } from "../types";

export const BackgroundImage = ({ source, width, height }: BackgroundImageType) => {
    const baseStyle = 'opacity-30 bottom-0 fixed -z-10 md:bottom-[10rem]';
    return (
        <div className="flex-row-reverse flex">
            <Image
                alt="Background Image"
                src={"/images/" + source + ".svg"}
                width={width}
                height={height}
                className={baseStyle}
            />
        </div>
    );
};