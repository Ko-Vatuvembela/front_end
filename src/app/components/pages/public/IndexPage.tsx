import { PublicHeader } from "../../shared/header/PublicHeader";
import { InputText } from "../../shared/body/forms/InputText";
export const IndexPage = () => {
    return (
        <>
            <PublicHeader />
            <div className="mx-auto">
                <h1 className="text-primaryBlue text-4xl my-8 font-light text-center">Um lugar para partilharmos conhecimentos e entendermos melhor as nossas raízes.</h1>
            </div>
            <form action="" method="post">
                <InputText label="Email" isRequired={true} name="email" optinalStyle="" placeholder="email@dominio.com" type="email" />
                <InputText label="Password" isRequired={true} name="password" optinalStyle="" placeholder="*********" type="password" />
            </form>
        </>
    );
};