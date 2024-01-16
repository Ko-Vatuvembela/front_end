'use client';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../../../../ckeditor5/build/ckeditor';
import parse from 'html-react-parser';

const TextEditor = () => {
	const [text, updateText] = useState<string>();
	const styles = new Map<string, string>();

	styles.set('h2', 'text-4xl font-bold');
	styles.set('h3', 'text-3xl font-bold');
	styles.set('h4', 'text-2xl font-bold');
	styles.set('ol', 'list-decimal');
	styles.set('ul', 'list-disc');
	styles.set('blockquote', 'italic');

	return (
		<div className="App">
			<CKEditor
				editor={Editor}
				data=""
				onChange={(event, editor) => {
					updateText(editor.data.get());
				}}
			/>
			<section className="my-10">
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
