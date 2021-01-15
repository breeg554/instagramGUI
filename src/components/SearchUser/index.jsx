import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { serachUserByName } from "../../state/selectedUser/operations";
import Modal from "../Modal";
import LoadingCircle from "../Loading";
import SingleUser from "../Followers/SingleUser";
import { SerachForm } from "./style";
import { FollowersWrapper } from "../Followers/style";
const SearchUser = ({ closeModal, serachUserByName, loggedUser }) => {
  let controller = null;

  const [limit, setLimit] = useState(10);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [dataFromApi, setData] = useState([]);

  const fetchFromApi = async (e) => {
    const { value } = e.target;
    setValue(value);

    if (value.length < 2) return setData([]);
    if (controller) controller.abort();

    setLoading(true);

    controller = new AbortController();
    const signal = controller.signal;

    serachUserByName(value, limit, signal)
      .then((res) => {
        controller = null;
        setLoading(false);
        if (!res) return setError(true);

        setData(res);
      })
      .catch((err) => setError(true));
  };

  const formatResult = () => {
    if (isLoading) return <LoadingCircle />;
    if (isError) return <p>Ups! Coś poszło nie tak</p>;
    return dataFromApi.length <= 0 ? (
      <p>Nie ma takiej osoby</p>
    ) : (
      dataFromApi.map((el) => <SingleUser key={el._id} data={el} />)
    );
  };
  return (
    <Modal closeModal={closeModal}>
      <SerachForm autoComplete="off">
        <input
          type="text"
          name="search"
          autoComplete="off"
          value={value}
          onChange={fetchFromApi}
        />
        <FollowersWrapper>
          {value.length < 2 ? null : formatResult()}
        </FollowersWrapper>
      </SerachForm>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => ({
  serachUserByName: (term, limit, signal) =>
    dispatch(serachUserByName(term, limit, signal)),
});
const mapStateToProps = (state) => ({
  loggedUser: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);

SearchUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
