import { InputText } from './InputText';
import { InputNumber } from './InputNumber';
import {
	type ILivro,
	type IBibliografia,
	type ITese,
	type IArtigo,
} from '@/app/components/types';
import { SelectBox } from './Select';
import { niveis } from '../../resources';

const MIN = 1800;

export const BibliografiaBasica = ({
	setTitulo,
	setAno,
	ano,
	tipo,
	setNomeAutor,
	setSobrenomeAutor,
	nomeAutor,
	sobrenomeAutor,
	titulo,
}: IBibliografia) => {
	const details = tipo === 'Dissertação' ? 'a Dissertação' : `o ${tipo}`;
	return (
		<div className="my-2">
			<InputText
				isRequired={true}
				label={`Título d${details}`}
				type="text"
				onChange={setTitulo}
				name="titulo"
				placeholder={titulo}
			/>
			<InputText
				isRequired={true}
				label="Nome do autor"
				type="text"
				onChange={setNomeAutor}
				name="nomeAutor"
				placeholder={nomeAutor}
			/>
			<InputText
				isRequired={true}
				label="Sobrenome do autor"
				type="text"
				onChange={setSobrenomeAutor}
				name="sobrenomeAutor"
				placeholder={sobrenomeAutor}
			/>
			<InputNumber
				isRequired={true}
				label="Ano de publicação"
				max={new Date().getFullYear()}
				min={MIN}
				step={1}
				value={String(ano)}
				name="ano"
				onChange={setAno}
			/>
		</div>
	);
};
export const Livro = ({
	edicao,
	setEdicao,
	editora,
	setEditora,
	localPublicacao,
	setLocalPublicacao,
}: ILivro) => {
	return (
		<div className="">
			<InputText
				isRequired={true}
				label="Editora"
				type="text"
				onChange={setEditora}
				name="editora"
				placeholder={editora}
			/>
			<InputNumber
				isRequired={true}
				label="Edição"
				min={1}
				step={1}
				value={String(edicao)}
				name="edicao"
				onChange={setEdicao}
			/>
			<InputText
				isRequired={true}
				label="Local de publicação"
				type="text"
				onChange={setLocalPublicacao}
				name="localPublicacao"
				placeholder={localPublicacao}
			/>
		</div>
	);
};

export const Artigo = ({ numeroPaginas, setNumeroPaginas }: IArtigo) => (
	<div className="">
		<InputNumber
			isRequired={true}
			label="Número de páginas"
			max={new Date().getFullYear()}
			min={10}
			step={1}
			value={String(numeroPaginas)}
			name="numeroPaginas"
			onChange={setNumeroPaginas}
		/>
	</div>
);
export const Tese = ({
	grau,
	nomeInstituicao,
	setGrau,
	setNomeInstituicao,
}: ITese) => (
	<div className="">
		<SelectBox
			values={niveis}
			name="grau"
			onChange={setGrau}
			titulo="Grau acadêmico"
		/>
		<InputText
			isRequired={true}
			label="Nome da Instituição de Ensino"
			type="text"
			onChange={setNomeInstituicao}
			name="nomeInstituicao"
			placeholder={nomeInstituicao}
		/>
	</div>
);
