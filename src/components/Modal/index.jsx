import { useEffect } from "react";
import PropTypes from "prop-types";
import { VscClose } from "react-icons/vsc";
import { StyledModal, ContentWrapper, CloseButton } from "./style";

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
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
