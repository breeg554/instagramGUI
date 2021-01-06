import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { selectedUser } from "../../state/selectedUser/operations";
import LoadingCircle from "../../components/Loading";
import {
  Header,
  ProfileImgWrapper,
  StatsWrapper,
  StatsElement,
  NotFound,
} from "./style";
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
    window.scrollTo(0, 0);
    const nameFromPathname = history.location.pathname.split("/")[2];

    fetchSelectedUser(nameFromPathname);
    return history.listen(async (location) => {
      if (!location.pathname.includes("/user/")) return;
      window.scrollTo(0, 0);
      const actualNameFromPathname = history.location.pathname.split("/")[2];

      await clearData();
      fetchSelectedUser(actualNameFromPathname);
    });
  }, []);
  if (userLoading) return <LoadingCircle size={25} />;
  if (userError)
    return (
      <NotFound>
        <p>Nie ma takiego użytkownika!</p>
        <Link to="/">Wróć na strone główną</Link>
      </NotFound>
    );
  if (!user) return <div />;

  return (
    <>
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
        <StatsWrapper>
          <StatsElement>
            Posty:
            <span>
              <strong>{user.images.length}</strong>
            </span>
          </StatsElement>
          <StatsElement desc>
            <button>
              <strong>{numFormatter(user.followers.length, 0)}</strong>
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
      </Header>

      {user.images.length <= 0 ? (
        <p style={{ textAlign: "center" }}>Dodaj swój pierwszy post!</p>
      ) : null}
      <Posts />
    </>
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
