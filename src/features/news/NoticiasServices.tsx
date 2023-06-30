import {capitalize, minutes} from "./utils"
import  {INoticiasNormalizadas} from "./noticia.types"
import { INoticias } from "./fakeRest";
interface INews extends INoticias{}

export const infNoticias = (noticias: INews[]): INoticiasNormalizadas[] => {
    return noticias.map((n) => ({
        id: n.id,
        titulo: capitalize(n.titulo),
        descripcion: n.descripcion,
        fecha: `Hace ${minutes(n.fecha)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
    }));
}


