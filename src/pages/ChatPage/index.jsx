import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import history from "../../history";
import Message from "./components/Message";
import LoadingCircle from "../../components/Loading";
import ProfileLink from "../../components/ProfilLink";
import { socket } from "../../utils/socket";
import { catchAuthError } from "../../state/user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";
import {
  ChatWrapper,
  MessagesWrapper,
  SendInputWrapper,
  SendButton,
  ProfileWrapper,
} from "./style";

const postMessage = async (data, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/messages`, {
    method: "POST",
    ...config,
    body: JSON.stringify(data),
  }).then(handleErrors);
};

const fetchMessages = async (id, limit = 0, skip = 0, config, signal) => {
  return await fetch(
    `${process.env.REACT_APP_API_URL}/user/messages/${id}?limit=${limit}&skip=${skip}`,
    {
      method: "GET",
      ...config,
      signal,
    }
  ).then(handleErrors);
};
const fetchUser = async (id, config) => {
  return await fetch(`${process.env.REACT_APP_API_URL}/user/basic/${id}`, {
    method: "GET",
    ...config,
  }).then(handleErrors);
};
const ChatPage = ({ user, token, catchAuthError, headerHeight }) => {
  let controller = null;
  const scrollableRef = useRef();
  //headerHeight props from privateRoute
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isError, setIsError] = useState(false);
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [messageValue, setMessageValue] = useState("");
  const location = useLocation();

  const handleGetUser = () => {
    const config = fetchConfig(token);
    const idFromPath = location.pathname.split("/")[3];
    fetchUser(idFromPath, config)
      .then((res) => {
        setFriend(res);
      })
      .catch((err) => {
        catchAuthError(err);
        if (err.message === "404") {
          history.push("/");
        }
      });
  };

  const handleGetMessages = () => {
    const config = fetchConfig(token);
    const idFromPath = location.pathname.split("/")[3];

    if (controller) controller.abort();

    controller = new AbortController();
    const signal = controller.signal;

    fetchMessages(idFromPath, limit, skip, config, signal)
      .then((res) => {
        controller = null;

        setMessages([...messages, ...res]);
        setSkip(skip + res.length);
        setHasMore(res.length < limit ? false : true);
      })
      .catch((err) => {
        setIsError(true);

        catchAuthError(err);
        if (err.message === "404") {
          history.push("/");
        }
      });
  };
  const handleAddMessage = (e) => {
    e.preventDefault();
    const config = fetchConfig(token);
    const idFromPath = location.pathname.split("/")[3];
    const newMessage = {
      name: messageValue,
      recipient: idFromPath,
      sender: user._id,
    };
    postMessage(newMessage, config)
      .then((res) => {
        setMessageValue("");
        setMessages([res, ...messages]);
        scrollableRef.scrollIntoView({ alignToTop: false, block: "end" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    socket.emit("identity", user._id);
    handleGetMessages();
    handleGetUser();
  }, []);
  useEffect(() => {
    socket.on("privateMessage", (message) => {
      setMessages([message, ...messages]); // true
    });
  }, [messages]);

  const formatView = () => {
    if (isError) return <p>Ups! Cos poszlo nie tak...</p>;
    return (
      <ChatWrapper headerHeight={headerHeight}>
        <ProfileWrapper>
          {friend ? <ProfileLink user={friend} /> : null}
        </ProfileWrapper>
        <MessagesWrapper id="scrollableDiv">
          <InfiniteScroll
            dataLength={messages.length}
            next={() => handleGetMessages()}
            hasMore={hasMore}
            inverse={true}
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              overflow: "visible",
            }}
            loader={<LoadingCircle />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "12px" }}>
                Nie ma więcej wiadomości!
              </p>
            }
            scrollableTarget="scrollableDiv"
          >
            {messages.map((message) => (
              <Message
                key={message._id}
                data={message}
                loggedUserId={user._id}
              />
            ))}
          </InfiniteScroll>
          <div ref={scrollableRef} />
        </MessagesWrapper>
        <SendInputWrapper onSubmit={handleAddMessage}>
          <input
            type="text"
            placeholder="Wyslij wiadomość..."
            value={messageValue}
            onChange={({ target }) => setMessageValue(target.value)}
          />
          {messageValue.length > 0 ? (
            <SendButton type="submit" onClick={handleAddMessage}>
              Wyslij
            </SendButton>
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
