import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import { Form } from "./style";
import { addImage } from "../../state/user/operations";
const AddImage = ({ addImage, imageLoading, closeModal }) => {
  const history = useHistory();
  const imageRef = useRef();
  const [description, setDescription] = useState("");
  const handleAddImage = (e) => {
    e.preventDefault();
    const { files } = imageRef.current;
    if (files[0].size > 1048576) {
      return alert("Zdjęcie nie moze byc większe niż 1mb!");
    }
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("description", description);
    addImage(formData, history);

    closeModal();
  };
  return (
    <Modal closeModal={closeModal}>
      <fieldset disabled={imageLoading}>
        <Form onSubmit={handleAddImage}>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/png, image/jpeg"
            required={true}
            ref={imageRef}
          />
          <input
            type="text"
            name="description"
            placeholder="Dodaj opis do zdjęcia"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button>Dodaj</button>
        </Form>
      </fieldset>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addImage: (data, history) => dispatch(addImage(data, history)),
});
const mapStateToProps = (state) => ({
  imageLoading: state.user.addImageLoading,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddImage);
AddImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
