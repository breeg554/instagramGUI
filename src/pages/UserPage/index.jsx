import { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { selectedUser } from "../../state/selectedUser/operations";
import LoadingCircle from "../../components/Loading";
import Posts from "./components/Posts";
import IsUserFollow from "./components/isUserFollow";
import Stats from "./components/Stats";
import { isLoggedUserProfile } from "../../utils/utils";
import {
  Header,
  HeaderSiteWrapper,
  ProfileImgWrapper,
  NotFound,
} from "./style";

const UserPage = ({
  clearData,
  fetchSelectedUser,
  user,
  userLoading,
  userError,
  loggedUser,
}) => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const nameFromPathname = history.location.pathname.split("/")[1];

    fetchSelectedUser(nameFromPathname);
    return history.listen(async (location) => {
      console.log("tu jest blad ");
      if (
        location.pathname.toString() === `/` ||
        location.pathname.toString() === `/login` ||
        location.pathname.toString() === `/register` ||
        location.pathname.includes("direct")
      )
        return;
      window.scrollTo(0, 0);
      const actualNameFromPathname = history.location.pathname.split("/")[1];

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
        <HeaderSiteWrapper>
          <h1>{user.name}</h1>
          <IsUserFollow />
        </HeaderSiteWrapper>
        <Stats user={user} />
      </Header>

      {user.images.length <= 0 ? (
        <p style={{ textAlign: "center" }}>
          {isLoggedUserProfile(user.id, loggedUser)
            ? "Dodaj swój pierwszy post!"
            : "Użytkownik nie dodał żadnych postów!"}
        </p>
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
  loggedUser: state.user.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
