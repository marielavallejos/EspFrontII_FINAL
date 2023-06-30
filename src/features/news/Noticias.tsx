import { useCallback, useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import { ContenedorNoticias, ListaNoticias, TituloNoticias } from "./styled";
import { INoticiasNormalizadas } from "./noticia.types";
import { infNoticias } from "./NoticiasServices";
import ModalSubs from "./ModalSubs";
import ModalPremium from "./ModalPremium";
import TarjetaNoticias from "./TarjetaNoticias";

//Utilice el primer principio SOLID, separando las funciones que se podian reutilizar en otros archivos. Tratando de que se cumpla que cada componente debe tener una sola responsabilidad

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  const getModal = useCallback(() => {
    if (!modal) {
      return undefined;
    }
    if (modal?.esPremium) {
      return (
        <ModalSubs
          onClose={() => setModal(null)}
          onSubs={() =>
            setTimeout(() => {
              alert("Suscripto!");
              setModal(null);
            }, 1000)
          }
        />
      );
    }
    return <ModalPremium {...modal} onClose={() => setModal(null)} />;
  }, [modal]);

  useEffect(() => {
    const info = async () => {
      const data = await obtenerNoticias();
      const noticiasNormalizadas = infNoticias(data);
      setNoticias(noticiasNormalizadas);
    };
    info();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        <TarjetaNoticias noticias={noticias} handlerClick={setModal} />
        <>{getModal()}</>
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;