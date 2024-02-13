export const TextArea = ({
	placeholder = '',
	name,
	label,
	setValue,
	value,
}: {
	value: string
	placeholder: string
	name: string
	label: string
	setValue: (e: string) => void
}) => {
	return (
		<div>
			<label className="my-1" htmlFor={name}>
				{label}
			</label>
			<textarea
				placeholder={placeholder}
				name={name}
				value={value}
				className="w-full p-1 bg-transparent"
				id={name}
				cols={30}
				rows={5}
				onChange={(e) => {
					setValue(e.currentTarget.value);
				}}
				required
			></textarea>
		</div>
	);
};
