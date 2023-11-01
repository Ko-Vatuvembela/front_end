import { type InputType } from '@/app/components/types';

export const InputText = ({
	name,
	type,
	label,
	value,
	placeholder,
	optinalStyle,
	isRequired,
	onChange,
}: InputType) => {
	const inputStyle =
		'border rounded-[14px] w-full pl-5 py-[14px] bg-transparent ';
	const labelStyle = 'text-primaryBlue text-[14px] font-semibold';
	return (
		<div className="mb-4">
			<label htmlFor={name} className={labelStyle}>
				{label}
			</label>
			<br />
			<input
				type={type}
				onChange={(e) => {
					onChange(e.currentTarget.value);
				}}
				name={name}
				placeholder={placeholder}
				id={name}
				required={isRequired}
				className={inputStyle + ' ' + optinalStyle}
				value={value}
			/>
		</div>
	);
};
