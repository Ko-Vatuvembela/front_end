import { type ISelectBox } from '@/app/components/types';

export const SelectBox = ({
	name,
	values,
	onChange,
	titulo,
	style = '',
}: ISelectBox) => (
	<div className={style}>
		<label className="my-1 text-primaryBlue" htmlFor={name}>
			{titulo}
		</label>
		<br />
		<select
			name={name}
			id={name}
			className={' p-3 border rounded-lg w-[10rem]'}
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
	</div>
);
