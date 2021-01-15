import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getFollowersOrFollowingUsers } from "../../state/selectedUser/operations";
import { FollowersWrapper } from "./style";
import Modal from "../Modal";
import LoadingCircle from "../Loading";
import Follower from "./SingleUser";
const Followers = ({ closeModal, whichOne, getDataFromApi, selectedUser }) => {
  const [dataFromApi, setData] = useState([]);
  const [isError, setError] = useState(false);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleGetData = () => {
    getDataFromApi(selectedUser.id, whichOne, limit, skip).then((res) => {
      if (!res) {
        setError(true);
        return setHasMore(false);
      }

      setData([...dataFromApi, ...res]);
      if (res.length < limit) return setHasMore(false);
      setSkip(skip + limit);
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
  getDataFromApi: (id, type, limit, skip) =>
    dispatch(getFollowersOrFollowingUsers(id, type, limit, skip)),
});
const mapStateToProps = (state) => ({
  selectedUser: state.selectedUser.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
Followers.propTypes = {
  whichOne: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
