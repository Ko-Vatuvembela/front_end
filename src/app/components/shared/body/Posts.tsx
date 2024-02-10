import { type IPost } from '../../types';
import { TextLink } from '../Link';

export const Post = ({ id_postagem, titulo }: IPost) => {
	return (
		<div className="mt-2">
			<TextLink href="#" text={titulo} key={id_postagem} />
		</div>
	);
};
/*
{
    "id_postagem": 2,
    "categoria": "Sintaxe",
    "bibliografia_fk": 11,
    "utilizador_fk": 1,
    "lingua_fk": 10,
    "conteudo": "roddas360@ccccccccccccccc.com",
    "titulo": "sfsfsf",
    "uid": {
      "nome": "Roddas",
      "sobrenome": "Cabral",
      "uid": 1
    },
    "idLingua": {
      "lingua": "Ibinda",
      "id": 10
    },
    "idBibliografia": {
      "id_bibliografia": 11,
      "nome_autor": "Rodolfo",
      "sobrenome_autor": "Cabral Neves",
      "titulo": "titulo do artigo",
      "ano": 2019
    }
*/
