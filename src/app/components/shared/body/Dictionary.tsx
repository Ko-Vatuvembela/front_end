import { type FormEvent, useState } from 'react';
import { InputText } from './forms/InputText';
import { Button } from './forms/Button';
import { SelectBox } from './forms/Select';
import { LanguageProvider } from '@/app/context/LanguageContext';
import {
	CLASSES_GRAMATICAIS,
	CREATED,
	ERROR_STYLE,
	UNPROCESSABLE_ENTITY,
} from '../resources';
import { type ILanguage } from '../../types';
import FetchRequest from '@/app/provider/api';
import { LoadingComponent } from './LoadingComponent';
import { useRouter } from 'next/navigation';

const fetchRequest = new FetchRequest();

export const Dictionary = () => {
	const router = useRouter();
	const [palavra, updatePalavra] = useState<string>();
	const [significado, updateSignificado] = useState<string>();
	const [classeGramatical, updateClasseGramatical] = useState<string>(
		CLASSES_GRAMATICAIS[0]
	);
	const [exemplo, updateExemplo] = useState<string>();
	const [pronuncia, updatePronuncia] = useState<string>();
	const [isHidden, setHidding] = useState<boolean>(true);
	const [mensagem, setMensagem] = useState<string>('');
	const [style, setStyle] = useState<string>('hidden');
	const [languages, setLanguages] = useState<ILanguage[]>([]);
	const [languageStr, setLanguageStr] = useState<string[]>([]);
	const [selectedLanguage, selectLanguage] = useState<string>();
	const [languagesIDHash, setLanguageHash] = useState<Map<string, number>>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const form = document.querySelector('form') as HTMLFormElement;

		const data = {
			palavra,
			significado,
			classeGramatical,
			exemplo,
			pronuncia,
			linguaFK: languagesIDHash?.get(selectedLanguage as string),
		};
		const request = await fetchRequest.post('dictionary', data);
		setHidding(false);
		if (request) {
			if (request.status === CREATED) {
				setHidding(true);
				form.reset();
				if (
					!confirm(
						'Palavra inserida com sucesso !! Clique OK para adicionar mais palavras ou Cancelar para voltar ao menu\n'
					)
				) {
					router.back();
				}
			} else if (request.status === UNPROCESSABLE_ENTITY) {
				setMensagem('Erro : Insira correctamente os dados !!');
				setStyle(ERROR_STYLE);
			}
		}
	};

	return (
		<LanguageProvider
			languages={languages}
			languagesToString={languageStr}
			setLanguagesToString={setLanguageStr}
			setLanguages={setLanguages}
			selectLanguage={selectLanguage}
			selectedLanguage={selectedLanguage}
			languagesIDHash={languagesIDHash}
			setLanguageHash={setLanguageHash}
		>
			<div className="w-full my-8">
				<form
					action="#"
					onSubmit={submit}
					method="post"
					className="mx-auto w-full"
				>
					<div className="">
						<InputText
							isRequired={true}
							label="Palavra em língua Nacional"
							name="palavra"
							placeholder="Ciwa"
							type="text"
							onChange={updatePalavra}
						/>
						<InputText
							isRequired={true}
							label="Como se pronuncia esta palavra ?"
							name="pronuncia"
							placeholder="Tchíwa"
							type="text"
							onChange={updatePronuncia}
						/>
						<InputText
							isRequired={true}
							label="Significado em português"
							name="significado"
							placeholder="Bem"
							type="text"
							onChange={updateSignificado}
						/>
						<InputText
							isRequired={true}
							label="Exemplo"
							name="exemplo"
							placeholder="Okusukula ciwa ovilya."
							type="text"
							onChange={updateExemplo}
						/>
						<SelectBox
							name="categoria"
							values={CLASSES_GRAMATICAIS}
							onChange={updateClasseGramatical}
							titulo="Classe gramatical"
						/>

						<br />
						<SelectBox
							name="lingua"
							values={languageStr}
							onChange={selectLanguage}
							titulo="Língua"
							style="mb-1"
						/>
						<br />

						<div className="flex mb-2">
							<Button text="Inserir" style=" w-[10rem]" />
						</div>
						<LoadingComponent hidden={isHidden} />
						{<p className={style}>{mensagem}</p>}
					</div>
				</form>
			</div>
		</LanguageProvider>
	);
};
