import PropTypes from "prop-types";
import { MessageWrapper, StyledMessage, SenderName } from "./style";
const Message = ({ data, loggedUserId }) => {
  const isMyMessage = loggedUserId === data.sender._id;
  return (
    <MessageWrapper isMyMessage={isMyMessage}>
      <StyledMessage isMyMessage={isMyMessage}>{data.name}</StyledMessage>
      {!isMyMessage ? <SenderName>{data.sender.name}</SenderName> : null}
    </MessageWrapper>
  );
};

export default Message;
Message.propTypes = {
  data: PropTypes.object.isRequired,
  loggedUserId: PropTypes.string.isRequired,
};
