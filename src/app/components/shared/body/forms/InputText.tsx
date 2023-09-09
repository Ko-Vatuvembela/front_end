import { InputType } from "@/app/components/types";

export const InputText = ({ name, type, label, placeholder, optinalStyle, isRequired }: InputType) => {
    const inputStyle = "border rounded-[14px] w-full pl-5 py-[14px]";
    const labelStyle = "text-primaryBlue text-[14px] font-semibold";
    return (
        <div className="mb-4">
            <label htmlFor={name} className={labelStyle}>{label}</label><br />
            <input type={type} name={name} placeholder={placeholder} id={name} required={isRequired} className={inputStyle + " " + optinalStyle} />
        </div>
    );
};