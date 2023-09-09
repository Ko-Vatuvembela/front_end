import { PublicHeader } from "../../shared/header/PublicHeader";
import { InputText } from "../../shared/body/forms/InputText";
import { Button } from "../../shared/body/forms/Button";
import Image from "next/image";
import { Footer } from "../../shared/Footer";
import { TextLink } from "../../shared/Link";
import { BackgroundImage } from "../../shared/BackgroundImage";

export const IndexPage = () => {

    const imageSize = 56;

    return (
        <>
            <PublicHeader />
            <div className="mx-auto">
                <h1 className="text-primaryBlue text-4xl my-8 font-light text-center">Um lugar para partilharmos conhecimentos e entendermos melhor as nossas raízes.</h1>
            </div>
            <div className="md:flex md:justify-around w-full mt-20">
                <section className="p-8 md:w-[40%]">
                    <form action="" method="post" >
                        <InputText label="Email" isRequired={true} name="email" optinalStyle="border-primaryBlue" placeholder="email@dominio.com" type="email" />
                        <InputText label="Password" isRequired={true} name="password" optinalStyle="border-primaryBlue" placeholder="*********" type="password" />
                        <Button text={"Entrar"} style="w-full mt-3" backgroundColor="bg-primaryBlue" isActive={true} textColor="text-white" hoverColor="hover:bg-secondaryBlue" />
                    </form>
                    <p className="my-3"><TextLink href={'forgotpassword'} optinalStyle="text-primaryBlue" text="Esqueceu a senha ?" /></p>
                    <p><TextLink href={'signup'} optinalStyle="text-primaryBlue" text="Crie uma conta" /></p>
                </section>

                <div className="block">
                    <Image alt="quote" src='/images/quotes.svg' width={imageSize} height={imageSize} />
                    <div className="flex justify-center text-center">
                        <p className="text-5xl font-extralight text-primaryBlue w-[80%] text-justify italic">Intsi ko kwata ,tyengo tya na mema</p>
                    </div>
                    <Image alt="quote" src='/images/quotes.svg' width={imageSize} height={imageSize} className="rotate-180 float-right mb-5" />
                    <p className=" text-base text-primaryBlue mt-12 ml-5"> - Ditado popular Ngangela</p>
                </div>
            </div>
            <BackgroundImage source="africa" height={540} width={500} />
            <Footer optinalStyle="md:mt-40 mt" />
        </>
    );
};;