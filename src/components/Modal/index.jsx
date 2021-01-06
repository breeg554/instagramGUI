import PropTypes from "prop-types";
import { VscClose } from "react-icons/vsc";
import { StyledModal, ContentWrapper, CloseButton } from "./style";

const Modal = ({ children, closeModal }) => {
  return (
    <StyledModal>
      <ContentWrapper>
        {children}
        <CloseButton onClick={closeModal}>
          <VscClose />
        </CloseButton>
      </ContentWrapper>
    </StyledModal>
  );
};

export default Modal;
Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
