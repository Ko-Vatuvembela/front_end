export const Title = ({
	text,
	style = '',
}: {
	text: string
	style?: string
}) => {
	return (
		<div className="mb-2">
			<p className={` ${style} text-3xl font-medium`}>{text}</p>
			<hr />
		</div>
	);
};
