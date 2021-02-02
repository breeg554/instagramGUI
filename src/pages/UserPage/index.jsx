import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { selectedUser } from "../../state/selectedUser/operations";
import LoadingCircle from "../../components/Loading";
import Posts from "./components/Posts";
import IsUserFollow from "./components/FollowUser";
import Stats from "./components/Stats";

import {
  Header,
  HeaderSiteWrapper,
  ProfileImgWrapper,
  NotFound,
} from "./style";

const UserPage = ({
  fetchSelectedUser,
  user,
  posts,
  userLoading,
  userError,
  router,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const nameFromPathname = router.location.pathname.split("/")[1];
    if (router.location.pathname === "/") return;
    fetchSelectedUser(nameFromPathname);
  }, [router.location]);

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
        <Stats user={user} posts={posts} />
      </Header>
      <Posts />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchSelectedUser: (name) => dispatch(selectedUser(name)),
});
const mapStateToProps = (state) => ({
  router: state.router,
  user: state.selectedUser.user,
  posts: state.selectedUser.posts,
  userLoading: state.selectedUser.userLoading,
  userError: state.selectedUser.userError,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
