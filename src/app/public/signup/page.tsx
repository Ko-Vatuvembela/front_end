import { InputText } from '@/app/components/shared/body/forms/InputText';
import { LayoutPattern } from '../LayoutPattern';
import { Button } from '@/app/components/shared/body/forms/Button';
import { TextLink } from '@/app/components/shared/Link';

export default function signUpPage () {
    return (
        <>
            <LayoutPattern backgroundImage="bubu" optionalStyle="mobile:w-[90%] md:w-[60%] lg:w-[40%]  mx-auto" >
                <h1 className="text-primaryBlue text-4xl my-8 font-light text-center">Crie uma conta</h1>
                <form method="post" name='criarcontaform' className="my-8" >
                    <InputText isRequired={true} label="Primeiro Nome" placeholder="Ex. Cykolomwenyo" type="text" name="nome" />
                    <InputText isRequired={true} label="Último nome" placeholder="Ex. Mwana" type="text" name="sobrenome" />
                    <InputText isRequired={true} label="E-mail" placeholder="Ex. MwanaCykolomwenyo@dominio.com" type="email" name="email" />
                    <InputText isRequired={true} label="Senha" placeholder="************************" type="password" name="password" />
                    <InputText isRequired={true} label="Confirme a senha" placeholder="************************" type="password" name="confirmpassword" />
                    <Button backgroundColor="bg-primaryBlue" style="w-full" isActive={true} text="Cadastrar" textColor="text-white" hoverColor="hover:bg-secondaryBlue" />
                </form>
                <TextLink href="/" text="Retroceder" optinalStyle="text-primaryBlue mb-8" />
            </LayoutPattern>
        </>
    );
};
