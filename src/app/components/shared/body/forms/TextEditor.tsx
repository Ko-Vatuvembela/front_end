'use client';
import { type FormEvent, useEffect, useState } from 'react';
import { InputText } from './InputText';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../../../../ckeditor5/build/ckeditor';
import parse from 'html-react-parser';
import { h1 } from '../../resources';
import { Livro, Artigo, Tese } from './TipoBibliografia';
import { Button } from './Button';
import { SelectBox } from './Select';

const TextEditor = () => {
	const [conteudo, setConteudo] = useState<string>('');
	const [titulo, setTitulo] = useState<string>('');
	const [categoria, setCategoria] = useState<string>('Fonologia');
	const [nomeAutor, setNomeAutor] = useState<string>('');
	const [sobrenomeAutor, setSobrenomeAutor] = useState<string>('');
	const [tipo, setTipo] = useState<string>('Artigo');

	useEffect(() => {
		if (!conteudo.length) {
			setConteudo('[Escreva alguma coisa]');
		}
		if (!titulo.length) {
			setTitulo('[Defina o título]');
		}
	}, [conteudo, titulo]);

	const styles = new Map<string, string>();

	styles.set('h2', 'text-4xl font-bold');
	styles.set('h3', 'text-3xl font-bold');
	styles.set('h4', 'text-2xl font-bold');
	styles.set('ol', 'list-decimal');
	styles.set('ul', 'list-disc');
	styles.set('blockquote', 'italic');

	const submitData = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		console.log(titulo, conteudo, categoria);
	};

	return (
		<form
			method="post"
			action={'#'}
			className="App"
			onSubmit={(e) => {
				submitData(e);
			}}
		>
			<fieldset className="p-3 border border-black rounded-lg text-primaryBlue">
				<legend>Informações sobre o conteúdo</legend>
				<InputText
					isRequired={true}
					label="Título"
					name="title"
					placeholder="Escreva o título da postagem"
					onChange={(e) => {
						setTitulo(e);
					}}
					type="text"
				/>
				<section className="my-4">
					<SelectBox
						titulo={'Selecione a categoria'}
						onChange={(e) => {
							setCategoria(e);
						}}
						name={'dd'}
						values={[
							'Fonologia',
							'Morfologia',
							'Sintaxe',
							'Diversos',
						]}
					/>
				</section>

				<CKEditor
					editor={Editor}
					data=""
					onChange={(event, editor) => {
						setConteudo(editor.data.get());
					}}
				/>
			</fieldset>
			<fieldset className="p-3 border border-black rounded-lg my-2 text-primaryBlue">
				<legend>Informações bilbiográficas</legend>
				<section className="my-2">
					<InputText
						isRequired={true}
						label="Nome do autor"
						name="nomeAutor"
						placeholder="Escreva o nome do autor do texto"
						onChange={(e) => {
							setNomeAutor(e);
						}}
						type="text"
					/>
					<InputText
						isRequired={true}
						label="Sobrenome do autor"
						name="sobrenomeAutor"
						placeholder="Escreva o sobrenome do autor do texto"
						onChange={(e) => {
							setSobrenomeAutor(e);
						}}
						type="text"
					/>
					<SelectBox
						name="tipo"
						titulo="Fonte"
						values={['Artigo', 'Dissertação', 'Livro']}
						onChange={(e) => {
							setTipo(e);
						}}
					/>
					{tipo === 'Artigo' && <Artigo />}
					{tipo === 'Dissertação' && <Tese />}
					{tipo === 'Livro' && <Livro />}
				</section>
			</fieldset>

			<section className="my-10 w-full overflow-hidden">
				<h1 className={h1}>{titulo}</h1>
				{conteudo &&
					parse(String(conteudo), {
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
			<Button text="Postar" />
		</form>
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
