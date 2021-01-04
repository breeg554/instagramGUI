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
