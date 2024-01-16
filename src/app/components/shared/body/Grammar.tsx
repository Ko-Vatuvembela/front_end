import dynamic from 'next/dynamic';

export const Grammar = () => {
	const TextEditor = dynamic(async () => await import('./forms/TextEditor'), {
		ssr: false,
	});
	return (
		<div className="w-full my-8">
			<TextEditor />
		</div>
	);
};
