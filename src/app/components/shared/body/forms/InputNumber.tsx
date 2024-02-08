import { type IInputNumber } from '@/app/components/types';

export const InputNumber = ({
	name,
	label,
	max,
	min,
	step,
	value,
	optinalStyle,
	isRequired,
	onChange,
}: IInputNumber) => {
	const inputStyle = 'border rounded-[14px] pl-5 py-[14px] bg-transparent ';
	const labelStyle = 'text-primaryBlue text-[14px] font-semibold';
	return (
		<div className="mb-4">
			<label htmlFor={name} className={labelStyle}>
				{label}
			</label>
			<br />
			<input
				type="number"
				onChange={(e) => {
					const value = Number.parseInt(e.currentTarget.value);
					if (value < min || value > max) {
						onChange(String(max));
					} else {
						onChange(String(value));
					}
				}}
				name={name}
				id={name}
				min={min}
				max={max}
				step={step}
				required={isRequired}
				className={inputStyle + ' ' + optinalStyle}
				value={value}
			/>
		</div>
	);
};
