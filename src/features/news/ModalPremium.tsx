import {
    ContenedorModal,
    TarjetaModal,
    CloseButton,
    ImagenModal,
    CotenedorTexto,
    TituloModal,
    DescripcionModal,
  } from "./styled";
  import { CloseButton as Close } from "../../assets";
import {IPropsModalPremium} from "./noticia.types"

  const ModalPremium = ({
    onClose,
    imagen,
    titulo,
    descripcion,
  }: IPropsModalPremium) => {
    return (
      <ContenedorModal data-testid="modal">
        <TarjetaModal>
          <CloseButton onClick={onClose}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal src={imagen} alt="news-image" />
          <CotenedorTexto>
            <TituloModal>{titulo}</TituloModal>
            <DescripcionModal>{descripcion}</DescripcionModal>
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };
  
  export default ModalPremium;