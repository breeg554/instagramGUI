import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { isUserAlreadyFollow, isLoggedUserProfile } from "../../utils/utils";
import { getFollowersOrFollowingUsers } from "../../state/selectedUser/operations";
import { toggleFollow } from "../../state/user/operations";
import { FollowersWrapper, SingleFollower } from "./style";
import Modal from "../Modal";
import ProfilLink from "../ProfilLink";
import ToggleFollow from "../ToggleFollow";
import LoadingCircle from "../Loading";

const Followers = ({
  closeModal,
  whichOne,
  getDataFromApi,
  selectedUser,
  loggedUser,
  toggleFollow,
}) => {
  const [dataFromApi, setData] = useState([]);
  const [isError, setError] = useState(false);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleGetData = () => {
    getDataFromApi(selectedUser.id, whichOne, limit, skip).then((res) => {
      if (!res) {
        setError(true);
        setHasMore(false);
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
          <Follower
            key={el._id}
            data={el}
            loggedUser={loggedUser}
            toggleFollow={toggleFollow}
          />
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
  toggleFollow: (id) => dispatch(toggleFollow(id)),
  getDataFromApi: (id, type, limit, skip) =>
    dispatch(getFollowersOrFollowingUsers(id, type, limit, skip)),
});
const mapStateToProps = (state) => ({
  selectedUser: state.selectedUser.user,
  loggedUser: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
Followers.propTypes = {
  whichOne: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const Follower = ({ data, loggedUser, toggleFollow }) => {
  return (
    <SingleFollower>
      <ProfilLink user={data} />
      {isLoggedUserProfile(data.id, loggedUser) ? (
        <p>ty</p>
      ) : (
        <ToggleFollow
          isFollowed={isUserAlreadyFollow(data.id, loggedUser)}
          func={() => toggleFollow(data.id)}
        />
      )}
    </SingleFollower>
  );
};
