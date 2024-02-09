import { type ISelectBox } from '@/app/components/types';

export const SelectBox = ({
	name,
	values,
	onChange,
	titulo,
	style = 'p-3 border rounded-lg w-[10rem]',
}: ISelectBox) => (
	<>
		<label htmlFor={name}>{titulo}</label>
		<br />
		<select
			name={name}
			id={name}
			className={style}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		>
			{values.map((value, index) => {
				return (
					<option value={value} key={index}>
						{value}
					</option>
				);
			})}
		</select>
	</>
);
