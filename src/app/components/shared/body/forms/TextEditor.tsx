'use client';
import { type FormEvent, useEffect, useState } from 'react';
import { InputText } from './InputText';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../../../../ckeditor5/build/ckeditor';
import parse from 'html-react-parser';
import { CREATED, h1, niveis, styles } from '../../resources';
import { Livro, Artigo, Tese, BibliografiaBasica } from './Bibliografia';
import { Button } from './Button';
import { SelectBox } from './Select';
import FetchRequest from '@/app/provider/api';
import { type ILanguage } from '@/app/components/types';
import { useRouter } from 'next/navigation';
import { LanguageProvider } from '@/app/context/LanguageContext';

const request = new FetchRequest();

const TextEditor = () => {
	const router = useRouter();
	const [conteudo, setConteudo] = useState<string>('');
	const [languageStrings, updateLanguageStrings] = useState<string[]>([]);
	const [selectedLanguage, setSelectedLanguage] = useState<string>();
	const [ano, setAno] = useState<number | string>(new Date().getFullYear());
	const [tituloPostagem, setTituloPostagem] = useState<string>('');
	const [tituloFonte, setTituloFonte] = useState<string>('');
	const [categoria, setCategoria] = useState<string>('Fonologia');
	const [nomeAutor, setNomeAutor] = useState<string>('');
	const [sobrenomeAutor, setSobrenomeAutor] = useState<string>('');
	const [tipo, setTipo] = useState<string>('Artigo');
	const [edicao, setEdicao] = useState<string>('1');
	const [editora, setEditora] = useState<string>('');
	const [localPublicacao, setLocalPublicacao] = useState<string>('');
	const [grau, setGrau] = useState<string>(niveis[0]);
	const [nomeInstituicao, setNomeInstituicao] = useState<string>('');
	const [numeroPaginas, setNumeroPaginas] = useState<string>('10');
	const [languageHash, setLanguageHash] = useState<Map<string, number>>();
	const [languageObjs, updateLanguageObjs] = useState<ILanguage[]>([]);

	useEffect(() => {
		if (!conteudo.length) {
			setConteudo('[Escreva alguma coisa]');
		}
		if (!tituloPostagem.length) {
			setTituloPostagem('[Defina o título]');
		}
	}, [conteudo, tituloPostagem]);

	const submitData = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		const data = {
			conteudo,
			tituloPostagem,
			bibliografia: {
				tipo,
				titulo: tituloFonte,
				nomeAutor,
				sobrenomeAutor,
				localPublicacao,
				editora,
				edicao,
				ano,
				grau,
				nomeInstituicao,
				numeroPaginas,
			},
			linguaFK: languageHash?.get(selectedLanguage as string),
			categoria,
		};
		try {
			const response = await request.post('post', data);
			if (response) {
				if (response.status === CREATED) {
					alert('Postagem criada com sucesso. ');
					// PRECISA REDIRECIONAR PARA VER A POSTAGEM
					router.back();
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<LanguageProvider
			setLanguages={updateLanguageObjs}
			languages={languageObjs}
			languagesIDHash={languageHash}
			setLanguageHash={setLanguageHash}
			languagesToString={languageStrings}
			setLanguagesToString={updateLanguageStrings}
		>
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
							setTituloPostagem(e);
						}}
						type="text"
					/>
					<section className="my-4">
						<SelectBox
							titulo={'Selecione a língua'}
							onChange={(e) => {
								setSelectedLanguage(e);
							}}
							name={'lingua_fk'}
							values={languageStrings}
						/>
					</section>
					<section className="my-4">
						<SelectBox
							titulo={'Selecione a categoria'}
							onChange={(e) => {
								setCategoria(e);
							}}
							name={'categoria'}
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
						<BibliografiaBasica
							tipo={tipo}
							setAno={setAno}
							ano={Number(ano)}
							nomeAutor={nomeAutor}
							setNomeAutor={setNomeAutor}
							sobrenomeAutor={sobrenomeAutor}
							setSobrenomeAutor={setSobrenomeAutor}
							titulo={tituloFonte}
							setTitulo={setTituloFonte}
						/>
						<SelectBox
							name="tipo"
							titulo="Fonte"
							values={['Artigo', 'Tese', 'Livro']}
							onChange={(e) => {
								setTipo(e);
							}}
						/>

						{tipo === 'Artigo' && (
							<Artigo
								numeroPaginas={Number(numeroPaginas)}
								setNumeroPaginas={setNumeroPaginas}
							/>
						)}
						{tipo === 'Tese' && (
							<Tese
								grau={grau}
								nomeInstituicao={nomeInstituicao}
								setGrau={setGrau}
								setNomeInstituicao={setNomeInstituicao}
							/>
						)}
						{tipo === 'Livro' && (
							<Livro
								edicao={Number(edicao)}
								editora={editora}
								localPublicacao={localPublicacao}
								setEdicao={setEdicao}
								setEditora={setEditora}
								setLocalPublicacao={setLocalPublicacao}
							/>
						)}
					</section>
				</fieldset>

				<section className="my-10 w-full overflow-hidden">
					<h1 className={h1}>{tituloPostagem}</h1>
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
		</LanguageProvider>
	);
};

export default TextEditor;
