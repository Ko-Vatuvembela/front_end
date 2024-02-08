import { InputText } from './InputText';
import { InputNumber } from './InputNumber';
import { type IBibliografia } from '@/app/components/types';

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
export const Livro = () => <div className="">LIVRO</div>;
export const Artigo = () => <div className="">Artigo</div>;
export const Tese = () => <div className="">Tese</div>;
