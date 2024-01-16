'use client';
import { useEffect, useState } from 'react';
import { InputText } from './InputText';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../../../../ckeditor5/build/ckeditor';
import parse from 'html-react-parser';
import { h1 } from '../../resources';

const TextEditor = () => {
	const [text, setText] = useState<string>('');
	const [title, setTitle] = useState<string>('');

	useEffect(() => {
		if (!text.length) {
			setText('[Escreva alguma coisa]');
		}
		if (!title.length) {
			setTitle('[Defina o título]');
		}
	}, [text, title]);

	const styles = new Map<string, string>();

	styles.set('h2', 'text-4xl font-bold');
	styles.set('h3', 'text-3xl font-bold');
	styles.set('h4', 'text-2xl font-bold');
	styles.set('ol', 'list-decimal');
	styles.set('ul', 'list-disc');
	styles.set('blockquote', 'italic');

	return (
		<div className="App">
			<InputText
				isRequired={true}
				label="Título"
				name="title"
				placeholder="Escreva o título da postagem"
				onChange={(e) => {
					setTitle(e);
				}}
				type="text"
			/>
			<CKEditor
				editor={Editor}
				data=""
				onChange={(event, editor) => {
					setText(editor.data.get());
				}}
			/>
			<section className="my-10">
				<h1 className={h1}>{title}</h1>
				{text &&
					parse(String(text), {
						replace: (elem) => {
							if (elem.type === 'tag') {
								const { attribs, name } = elem;
								Object.assign(attribs, {
									class: styles.get(name),
								});
							}
						},
					})}
			</section>
		</div>
	);
};

export default TextEditor;

// replace: (elem) => {
// 							if (elem instanceof Element) {
// 								const { attribs, name } = elem;
// 								if (name) {
// 									attribs.class = styles.get(name) as string;
// 								}
// 							}
// 						},
