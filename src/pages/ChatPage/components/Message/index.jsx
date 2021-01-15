import PropTypes from "prop-types";
import { MessageWrapper, StyledMessage } from "./style";
const Message = ({ data, loggedUserId }) => {
  return (
    <MessageWrapper>
      <StyledMessage isMyMessage={loggedUserId === data.sender}>
        {data.name}
      </StyledMessage>
    </MessageWrapper>
  );
};

export default Message;
Message.propTypes = {
  data: PropTypes.object.isRequired,
  loggedUserId: PropTypes.string.isRequired,
};
