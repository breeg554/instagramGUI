import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { catchAuthError } from "../../state/user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";
import history from "../../history";
import Message from "./components/Message";
import LoadingCircle from "../../components/Loading";
import {
  ChatWrapper,
  MessagesWrapper,
  SendInputWrapper,
  SendButton,
} from "./style";
const postMessage = async (data, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/messages`, {
    method: "POST",
    ...config,
    body: JSON.stringify(data),
  }).then(handleErrors);
};

const fetchMessages = async (id, limit = 0, skip = 0, config) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/messages/${id}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
    }
  ).then(handleErrors);
};

const ChatPage = ({ user, token, catchAuthError, headerHeight }) => {
  //headerHeight props from privateRoute
  const [userIdFromPath, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const location = useLocation();
  // let socket = io(`${process.env.REACT_APP_SERVER}/`);

  // socket.on("privateMessage", (data) => {
  //   console.log(data); // true
  // });

  const handleGetMessages = () => {
    const config = fetchConfig(token);
    const idFromPath = location.pathname.split("/")[3];

    fetchMessages(idFromPath, limit, skip, config)
      .then((res) => {
        setIsLoading(false);
        setMessages(res);
        setSkip(skip + res.length);
        setHasMore(res.length < limit ? false : true);
        console.log(res);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
        catchAuthError(err);
        if (err.message === "404") {
          history.push("/");
        }
      });
  };
  const handleAddMessage = () => {
    const config = fetchConfig(token);
    const idFromPath = location.pathname.split("/")[3];
    const newMessage = {
      name: messageValue,
      recipient: idFromPath,
      sender: user._id,
    };
    postMessage(newMessage, config)
      .then((res) => {
        // dispatch(actions.fetch_posts(res));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // socket.emit("identity", user._id);

    handleGetMessages();
    // return () => socket.on("disconnect");
  }, []);
  // useEffect(() => {
  //   return () => socket.on("disconnect");
  // }, [socket]);
  const formatView = () => {
    if (isError) return <p>Ups! Cos poszlo nie tak...</p>;
    return (
      <ChatWrapper headerHeight={headerHeight}>
        <div>Gora</div>
        <MessagesWrapper id="scrollableDiv">
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={messages.length}
            next={() => handleGetMessages()}
            hasMore={hasMore}
            inverse={true}
            loader={<LoadingCircle />}
            endMessage={
              <p style={{ textAlign: "center" }}>Nie ma więcej wiadomości!</p>
            }
          >
            {messages.map((message) => (
              <Message
                key={message._id}
                data={message}
                loggedUserId={user._id}
              />
            ))}
          </InfiniteScroll>
        </MessagesWrapper>
        <SendInputWrapper>
          <input
            type="text"
            placeholder="Wyslij wiadomość..."
            value={messageValue}
            onChange={({ target }) => setMessageValue(target.value)}
          />
          {messageValue.length > 0 ? (
            <SendButton onClick={handleAddMessage}>Wyslij</SendButton>
          ) : null}
        </SendInputWrapper>
      </ChatWrapper>
    );
  };
  return formatView();
};
const mapDispatchToProps = (dispatch) => ({
  catchAuthError: (err) => dispatch(catchAuthError(err)),
});
const mapStateToProps = (state) => ({
  user: state.user.user,
  token: state.user.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
