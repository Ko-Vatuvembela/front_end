import Image from "next/image";
import { BackgroundImageType } from "../types";

export const BackgroundImage = ({ source, width, height }: BackgroundImageType) => {
    return (
        <Image alt="Background Image" src={"/images/" + source + ".svg"} width={width} height={height} className="opacity-30 right-[16.7%] fixed -mt-[10%] z-0" />
    );
};