import { Link } from "react-router-dom";
import { NotFound } from "../UserPage/style";

const Error = () => {
  return (
    <NotFound>
      <p>404</p>
      <p>Nie ma takiej strony!</p>
      <Link to="/">Wróć na strone główną</Link>
    </NotFound>
  );
};

export default Error;
