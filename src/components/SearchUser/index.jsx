import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../Modal";
import LoadingCircle from "../Loading";
import SingleUser from "../Followers/SingleUser";
import Input from "../Input";
import { catchAuthError } from "../../state/user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";
import { SerachForm } from "./style";
import { FollowersWrapper } from "../Followers/style";
const serachUserByName = async (term, limit, signal, token) => {
  const config = fetchConfig(token);

  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/accounts/search?term=${term}&limit=${limit}`,
    {
      method: "GET",
      ...config,
      signal,
    }
  ).then(handleErrors);
};

const SearchUser = ({ closeModal, token, catchAuthError }) => {
  let controller = null;

  const [limit, setLimit] = useState(10);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [dataFromApi, setData] = useState([]);

  const fetchFromApi = async (e) => {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);

    if (value.length < 2) return setData([]);
    if (controller) controller.abort();

    setLoading(true);

    controller = new AbortController();
    const signal = controller.signal;

    serachUserByName(value, limit, signal, token)
      .then((res) => {
        controller = null;
        setLoading(false);
        if (!res) return setError(true);

        setData(res);
      })
      .catch((err) => {
        setError(true);
        catchAuthError(err);
      });
  };

  const formatResult = () => {
    if (isLoading) return <LoadingCircle />;
    if (isError) return <p>Ups! Coś poszło nie tak</p>;
    return dataFromApi.length <= 0 ? (
      <p>Nie ma takiej osoby</p>
    ) : (
      dataFromApi.map((el) => (
        <SingleUser closeModal={closeModal} key={el._id} data={el} />
      ))
    );
  };
  return (
    <Modal closeModal={closeModal}>
      <SerachForm autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <Input
          placeholder="Szukaj..."
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
  catchAuthError: (err) => dispatch(catchAuthError(err)),
});
const mapStateToProps = (state) => ({
  token: state.user.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);

SearchUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
