import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { catchAuthError } from "../../state/user/operations";
import { handleErrors, fetchConfig } from "../../utils/utils";
import history from "../../history";
import Message from "./components/Message";
import LoadingCircle from "../../components/Loading";
import { socket } from "../../utils/socket";
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
  const [hasMore, setHasMore] = useState(true);
  const [messageValue, setMessageValue] = useState("");
  const location = useLocation();

  const handleGetMessages = () => {
    const config = fetchConfig(token);
    const idFromPath = location.pathname.split("/")[3];

    fetchMessages(idFromPath, limit, skip, config)
      .then((res) => {
        setIsLoading(false);
        setMessages([...messages, ...res]);
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
        setMessageValue("");
        setMessages([res, ...messages]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    socket.emit("identity", user._id);
    handleGetMessages();
  }, []);
  useEffect(() => {
    socket.on("privateMessage", (message) => {
      setMessages([message, ...messages]); // true
    });
  }, [messages]);

  // const isMessageProfilActive = () => {
  //   let isActive = true;

  //   return messages.map((message) => {
  //     isActive = user._id === message.sender._id
  //     return (
  //       <Message key={message._id} data={message} loggedUserId={user._id} />
  //     );
  //   });
  // };

  const formatView = () => {
    if (isError) return <p>Ups! Cos poszlo nie tak...</p>;
    return (
      <ChatWrapper headerHeight={headerHeight}>
        <div>Gora</div>
        <MessagesWrapper id="scrollableDiv">
          <InfiniteScroll
            dataLength={messages.length}
            next={() => handleGetMessages()}
            hasMore={hasMore}
            inverse={true}
            style={{ display: "flex", flexDirection: "column-reverse" }}
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
