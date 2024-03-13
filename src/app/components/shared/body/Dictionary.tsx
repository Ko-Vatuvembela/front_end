import { type FormEvent, useState } from 'react';
import { InputText } from './forms/InputText';
import { Button } from './forms/Button';
import { SelectBox } from './forms/Select';
import { LanguageProvider } from '@/app/context/LanguageContext';
import {
	CLASSES_GRAMATICAIS,
	CREATED,
	ERROR_STYLE,
	SUCCESS_STYLE,
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
	const [isHidden, setHidding] = useState<boolean>(true);
	const [mensagem, setMensagem] = useState<string>('');
	const [style, setStyle] = useState<string>('hidden');
	const [languages, setLanguages] = useState<ILanguage[]>([]);
	const [languageStr, setLanguageStr] = useState<string[]>([]);
	const [selectedLanguage, selectLanguage] = useState<string>();
	const [languagesIDHash, setLanguageHash] = useState<Map<string, number>>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();

		const data = {
			palavra,
			significado,
			classeGramatical,
			exemplo,
			linguaFK: languagesIDHash?.get(selectedLanguage as string),
		};
		const request = await fetchRequest.post('dictionary', data);
		setHidding(false);
		if (request) {
			if (request.status === CREATED) {
				setStyle(SUCCESS_STYLE);
				setHidding(true);
				setMensagem('Palavra inserida !!');
				setTimeout(() => {
					router.back();
				}, 3 * 1000);
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
							placeholder="Muxima"
							type="text"
							onChange={updatePalavra}
						/>
						<InputText
							isRequired={true}
							label="Significado em português"
							name="significado"
							placeholder="Coração"
							type="text"
							onChange={updateSignificado}
						/>
						<InputText
							isRequired={true}
							label="Exemplo"
							name="exemplo"
							placeholder="Muxima uteketa. Wevu?"
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
