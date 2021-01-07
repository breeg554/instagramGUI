export const handleErrors = async (response) => {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response.json();
};
export const fetchConfig = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
export const numFormatter = (num, digits) => {
  var si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};
export const isLoggedUserProfile = (userID, loggedUser) => {
  return userID.toString() === loggedUser.id.toString();
};
export const isUserAlreadyFollow = (userID, loggedUser) => {
  return (
    loggedUser.followingUsers.findIndex((user) => user._id === userID) > -1
  );
};
