
import { PublicHeader } from "@/app/components/shared/header/PublicHeader";
import { Footer } from '@/app/components/shared/Footer';
import { BackgroundImage } from "@/app/components/shared/BackgroundImage";
import { LayoutType } from '@/app/components/types';

export const LayoutPattern = ({
    children,
    backgroundImage
}: LayoutType) => {


    return (
        <>
            <PublicHeader />
            {children}
            <BackgroundImage source={backgroundImage} height={540} width={500} />
            <Footer />
        </>
    );
};;