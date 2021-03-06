import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "../Modal";
import LoadingCircle from "../Loading";
import Follower from "./SingleUser";
import { FollowersWrapper } from "./style";
import { catchAuthError } from "../../state/user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";

const getFollowersOrFollowingUsers = async (id, type, limit, skip, token) => {
  const config = fetchConfig(token);

  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/${type}/${id}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
    }
  ).then(handleErrors);
};

const Followers = ({
  closeModal,
  whichOne,
  selectedUser,
  catchAuthError,
  token,
}) => {
  const [dataFromApi, setData] = useState([]);
  const [isError, setError] = useState(false);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleGetData = () => {
    getFollowersOrFollowingUsers(selectedUser.id, whichOne, limit, skip, token)
      .then((res) => {
        if (!res) {
          setError(true);
          return setHasMore(false);
        }

        setData([...dataFromApi, ...res]);
        if (res.length < limit) return setHasMore(false);
        setSkip(skip + limit);
      })
      .catch((err) => {
        setError(true);
        catchAuthError(err);
      });
  };
  useEffect(() => {
    handleGetData();
  }, []);

  const formatResult = () => {
    if (isError) return <p>Ups! Coś poszło nie tak!</p>;
    return (
      <InfiniteScroll
        dataLength={dataFromApi.length}
        next={handleGetData}
        hasMore={hasMore}
        loader={<LoadingCircle />}
        endMessage={
          <p style={{ textAlign: "center", fontSize: "12px" }}>
            Nie ma wiecej użytkowników!
          </p>
        }
        scrollableTarget="scrollableDiv"
      >
        {dataFromApi.map((el) => (
          <Follower key={el._id} data={el} />
        ))}
      </InfiniteScroll>
    );
  };
  return (
    <Modal closeModal={closeModal}>
      <FollowersWrapper id="scrollableDiv" style={{ maxHeight: "450px" }}>
        {formatResult()}
      </FollowersWrapper>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  catchAuthError: (err) => dispatch(catchAuthError(err)),
});
const mapStateToProps = (state) => ({
  selectedUser: state.selectedUser.user,
  token: state.user.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
Followers.propTypes = {
  whichOne: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
