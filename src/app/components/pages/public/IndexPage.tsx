import { PublicHeader } from "../../shared/header/PublicHeader";
import { InputText } from "../../shared/body/forms/InputText";
import { Button } from "../../shared/body/forms/Button";
import Link from "next/link";
import Image from "next/image";
export const IndexPage = () => {
    const imageSize = 56;
    return (
        <>
            <PublicHeader />
            <div className="mx-auto">
                <h1 className="text-primaryBlue text-4xl my-8 font-light text-center">Um lugar para partilharmos conhecimentos e entendermos melhor as nossas raízes.</h1>
            </div>
            <div className="flex justify-around w-full mt-20">
                <section className="p-8 w-[40%]">
                    <form action="" method="post" >
                        <InputText label="Email" isRequired={true} name="email" optinalStyle="" placeholder="email@dominio.com" type="email" />
                        <InputText label="Password" isRequired={true} name="password" optinalStyle="" placeholder="*********" type="password" />
                        <Button text={"Entrar"} style="w-full mt-3" backgroundColor="bg-primaryBlue" isActive={true} textColor="text-white" hoverColor="hover:bg-secondaryBlue" />
                    </form>
                    <p className="my-3"><Link href={'forgotpassword'} className="text-base text-primaryBlue  hover:underline">Esqueceu a senha ?</Link></p>
                    <p><Link href={'signup'} className="text-base text-primaryBlue hover:underline">Crie uma conta</Link></p>
                </section>

                <div className="block0">
                    <Image alt="quote" src='/images/quotes.svg' width={imageSize} height={imageSize} />
                    <div className="flex justify-center text-center">
                        <p className="text-5xl font-extralight text-primaryBlue w-[80%] text-justify">Intsi ko kwata ,tyengo tya na mema</p>
                    </div>
                    <Image alt="quote" src='/images/quotes.svg' width={imageSize} height={imageSize} className="rotate-180 float-right mb-5" />
                    <p className=" text-base text-primaryBlue mt-12 ml-5"> - Ditado popular Ngangela</p>
                </div>
            </div>

        </>
    );
};;