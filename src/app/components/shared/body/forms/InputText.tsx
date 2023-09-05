import { InputType } from "@/app/components/types";

export const InputText = ({ name, type, label, placeholder, optinalStyle, isRequired }: InputType) => {
    const inputStyle = "border border-blue-500 mb-5 mt-1 p-1 rounded-sm";
    const labelStyle = "text-base text-primaryBlue";
    return (
        <div className="w-fit">
            <label htmlFor={name} className={labelStyle}>{label}</label><br />
            <input type={type} name={name} placeholder={placeholder} id={name} required={isRequired} className={inputStyle + " " + optinalStyle} />
        </div>
    );
};