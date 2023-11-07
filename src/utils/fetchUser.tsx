export const getUser = () => {
  const headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  };
  fetch(`${import.meta.env.VITE_APP_BASE_URL}auth/loginSuccess`, {
    method: "GET",
    credentials: "include",
    headers,
  })
    .then((res) => {
      if (res.status === 200) return res.json();
      throw new Error("auth failed");
    })
    .then((response) => {
      //logger(response);
      return Promise.resolve(response);
    })
    .catch((err) => {
      logger(err);
    });
};
