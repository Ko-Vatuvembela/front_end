'use client';
import { type FormEvent, useEffect, useState, useRef } from 'react';
import { InputText } from './InputText';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '../../../../../../ckeditor5/build/ckeditor';
import parse from 'html-react-parser';
import {
	OK,
	UNAUTHORIZED,
	CREATED,
	h1,
	niveis,
	INTERNAL_SERVER_ERROR_PAGE,
} from '../../resources';
import { Livro, Artigo, Tese, BibliografiaBasica } from './Bibliografia';
import { Button } from './Button';
import { SelectBox } from './Select';
import FetchRequest from '@/app/provider/api';
import { type ILanguage } from '@/app/components/types';
import { useRouter } from 'next/navigation';

const request = new FetchRequest();

const TextEditor = () => {
	const router = useRouter();
	const [conteudo, setConteudo] = useState<string>('');
	const [languages, setLanguages] = useState<string[]>([]);
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
	const languageHash = useRef<Map<string, number>>();

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get('lingua');

				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = (await req.json()) as ILanguage[];
					const hash = new Map<string, number>();
					setSelectedLanguage(list[0].lingua);
					const tmpArr: string[] = [];
					for (const elem of list) {
						tmpArr.push(elem.lingua);
						hash.set(elem.lingua, elem.id);
					}
					setLanguages(tmpArr);
					languageHash.current = hash;
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
		if (!conteudo.length) {
			setConteudo('[Escreva alguma coisa]');
		}
		if (!tituloPostagem.length) {
			setTituloPostagem('[Defina o título]');
		}
	}, [conteudo, tituloPostagem]);

	const styles = new Map<string, string>();

	styles.set('h2', 'text-4xl font-bold');
	styles.set('h3', 'text-3xl font-bold');
	styles.set('h4', 'text-2xl font-bold');
	styles.set('ol', 'list-decimal');
	styles.set('ul', 'list-disc');
	styles.set('blockquote', 'italic');

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
			linguaFK: languageHash.current?.get(selectedLanguage as string),
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
				console.log(response.status);
			}
		} catch (e) {
			console.error(e);
		}
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
						values={languages}
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
	);
};

export default TextEditor;
