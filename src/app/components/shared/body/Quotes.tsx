import { useEffect, useState } from 'react';
import { Title } from '../Title';
import { useRouter } from 'next/navigation';
import FetchRequest from '@/app/provider/api';
import { type ILanguage } from '../../types';
import {
	UNAUTHORIZED,
	OK,
	INTERNAL_SERVER_ERROR_PAGE,
	CREATED,
} from '../resources';
import { TextArea } from './forms/TextArea';
import { Button } from './forms/Button';
const request = new FetchRequest();

export const Quotes = () => {
	const router = useRouter();
	const [proverbio, setProverbio] = useState<string>('');
	const [explicacao, setExplicacao] = useState<string>('');
	const [linguaFK, setLinguaFK] = useState<number>(0);
	const [lingua, setLingua] = useState<string>('');
	const [languageList, setLanguageList] = useState<ILanguage[]>([]);

	const submitQuote = async () => {
		const data = {
			linguaFK,
			proverbio,
			explicacao,
		};
		if (proverbio.length && explicacao.length) {
			const req = await request.post('quotes', data);
			if (req) {
				if (req.status === CREATED) {
					alert('Cadastrado com sucesso');
					setProverbio('');
					setExplicacao('');
				}
			}
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const req = await request.get('lingua');
				if (req.status === UNAUTHORIZED) {
					sessionStorage.clear();
					router.replace('/');
				} else if (req.status === OK) {
					const list = (await req.json()) as ILanguage[];
					setLanguageList(list);
					setLinguaFK(list[0].id);
					setLingua(list[0].lingua);
				}
			} catch (e) {
				router.replace(INTERNAL_SERVER_ERROR_PAGE);
			}
		})();
	}, []);
	return (
		<div className="w-full my-8 block">
			<Title text="Adicionar um provérbio" />
			<div className="my-2">
				<label className="my-1" htmlFor="lingua">
					Língua
				</label>
				<br />
				<select
					name="linguaFK"
					id="lingua"
					className="p-3 border rounded-lg w-[10rem]"
					onChange={(e) => {
						const tmp = e.currentTarget.value.split(' ');
						setLinguaFK(Number(tmp[0]));
						setLingua(tmp[1]);
					}}
				>
					{languageList.map(({ id, lingua }, index) => {
						return (
							<option value={`${id} ${lingua}`} key={index}>
								{lingua}
							</option>
						);
					})}
				</select>
			</div>
			<TextArea
				label={`Escreva o provérbio em ${lingua}`}
				name="proverbio"
				placeholder="A engi avwandanga va kyandu, se avwanda va ntoto, avwandanga va ntoto se avwanda va kyandu(kyandi) ..."
				value={proverbio.trim()}
				setValue={setProverbio}
			/>
			<div className="my-2"></div>
			<TextArea
				label="Faça uma descrição do provérbio em Português"
				name="explicacao"
				placeholder="Muitos dos que se assentam nas cadeiras, assentar-se-ão no chão, e os que estão sentados no chão assentar-se-ão nas cadeiras. Este provérbio, significa que neste mundo tudo pode mudar."
				value={explicacao.trim()}
				setValue={setExplicacao}
			/>
			<div className="my-2"></div>
			<Button text="Cadastrar" onClick={submitQuote} />
		</div>
	);
};
