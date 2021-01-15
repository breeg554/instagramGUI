import { useEffect } from "react";
import PropTypes from "prop-types";
import { VscClose } from "react-icons/vsc";
import { StyledModal, ContentWrapper, CloseButton } from "./style";

const Modal = ({ children, closeModal }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal") closeModal();
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, []);
  return (
    <StyledModal id="modal">
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
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.elementType,
    PropTypes.object,
  ]).isRequired,
  closeModal: PropTypes.func.isRequired,
};
