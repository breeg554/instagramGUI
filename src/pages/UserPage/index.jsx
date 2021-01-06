import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { selectedUser } from "../../state/selectedUser/operations";
import LoadingCircle from "../../components/Loading";
import { Header, ProfileImgWrapper, StatsWrapper, StatsElement } from "./style";
import { numFormatter } from "../../utils/utils";
import Posts from "./components/Posts";

const UserPage = ({
  clearData,
  fetchSelectedUser,
  user,
  userLoading,
  userError,
}) => {
  const history = useHistory();

  useEffect(() => {
    // const { state } = history.location;
    const nameFromPathname = history.location.pathname.split("/")[2];

    fetchSelectedUser(nameFromPathname);

    return history.listen(async (location) => {
      if (!location.pathname.includes("/user/")) return clearData();
      const actualNameFromPathname = history.location.pathname.split("/")[2];

      const actualState = history.location.state;
      console.log(actualState);
      //   if (
      //     actualState &&
      //     actualState.from &&
      //     actualNameFromPathname === actualState.from.split("/")[2]
      //   )
      //     return;

      await clearData();
      fetchSelectedUser(actualNameFromPathname);
    });
  }, []);
  if (userLoading) return <LoadingCircle size={25} />;
  if (userError) return <p>Nie ma takiego użytkownika!</p>;
  if (!user) return <div />;

  return (
    <div>
      <Header>
        <ProfileImgWrapper>
          {user.avatar ? (
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/${user.avatar}`}
              alt="avatar"
            />
          ) : (
            <AiOutlineUser />
          )}
        </ProfileImgWrapper>
        <h1>{user.name}</h1>
      </Header>
      <StatsWrapper>
        <StatsElement>
          Posty:
          <span>
            <strong>{user.images.length}</strong>
          </span>
        </StatsElement>
        <StatsElement desc>
          <button>
            <strong>{numFormatter(8888, 0)}</strong>
          </button>
          Obserwujacych
        </StatsElement>
        <StatsElement>
          Obserwuje:
          <button>
            <strong>{numFormatter(user.followingUsers.length, 2)}</strong>
          </button>
        </StatsElement>
      </StatsWrapper>
      <Posts />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSelectedUser: (name) => dispatch(selectedUser(name)),
  clearData: () => dispatch({ type: "USER_CLEAR_POSTS" }),
});
const mapStateToProps = (state) => ({
  user: state.selectedUser.user,
  userLoading: state.selectedUser.userLoading,
  userError: state.selectedUser.userError,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
