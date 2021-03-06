import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../LoginButton";
import { Form } from "./style";
import { addImage } from "../../state/selectedUser/operations";

const AddImage = ({ addImage, imageLoading, closeModal }) => {
  const history = useHistory();
  const imageRef = useRef();
  const formRef = useRef();
  const [isFormValidate, setIsFormValidate] = useState(false);
  const [description, setDescription] = useState("");
  const [imgSrc, setSrc] = useState("");

  const handleChangeImage = (e) => {
    try {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      setSrc(url);
    } catch (err) {
      console.log(err);
    }
    setIsFormValidate(formRef.current.checkValidity());
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    const { files } = imageRef.current;
    if (files[0].size > 1048576) {
      return alert("Zdjęcie nie moze byc większe niż 1mb!");
    }
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("description", description);
    addImage(formData, history).then((res) => {
      if (res) return;
      closeModal();
    });
  };
  useEffect(() => {
    return () => URL.revokeObjectURL(imgSrc);
  });
  return (
    <Modal closeModal={closeModal}>
      <fieldset disabled={imageLoading}>
        <Form ref={formRef} onSubmit={handleAddImage}>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/png, image/jpeg"
            required={true}
            ref={imageRef}
            onChange={handleChangeImage}
          />
          {imgSrc ? <img src={imgSrc} alt="select" /> : null}
          <Input
            name="description"
            placeholder="Dodaj opis do zdjęcia"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button active={isFormValidate} isLoading={imageLoading}>
            Dodaj
          </Button>
        </Form>
      </fieldset>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addImage: (data, history) => dispatch(addImage(data, history)),
});
const mapStateToProps = (state) => ({
  imageLoading: state.selectedUser.addImageLoading,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
AddImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
