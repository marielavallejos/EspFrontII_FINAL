import {
    BotonSuscribir,
    CloseButton,
    ContenedorModal,
    CotenedorTexto,
    DescripcionModal,
    ImagenModal,
    TarjetaModal,
    TituloModal,
  } from "./styled";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import {IPropsModalSubs } from "./noticia.types"

  const ModalSubs = ({
    onClose,
    onSubs,
  }: IPropsModalSubs) => {
    return (
      <ContenedorModal data-testid="modal">
        <TarjetaModal>
          <CloseButton onClick={onClose}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
          <CotenedorTexto>
            <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
            <DescripcionModal>
              Suscríbete a nuestro newsletter y recibe noticias de nuestros
              personajes favoritos.
            </DescripcionModal>
            <BotonSuscribir onClick={onSubs}>Suscríbete</BotonSuscribir>
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };
  
  export default ModalSubs;