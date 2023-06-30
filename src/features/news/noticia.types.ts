export interface INoticiasNormalizadas {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: number | string;
    esPremium: boolean;
    imagen: string;
    descripcionCorta?: string;
}

export interface ITarjetaNoticias {
    noticias: INoticiasNormalizadas[];
    handlerClick: (n: INoticiasNormalizadas) => void;
  }

export interface IPropsModalPremium {
    onClose: () => void;
    imagen: string;
    titulo: string;
    descripcion: string;
  }

export interface IPropsModalSubs {
    onClose: () => void;
    onSubs: () => void;
  }
