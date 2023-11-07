import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import style from "./Auth.module.scss";
import Logo from "../../images/icons/logo.svg";
//import { AuthContext } from "../../context/AuthContext.jsx";

const AuthReq = () => {
  // const [authState, setAuthState] = useContext<any>(AuthContext);
  //const navigate = useNavigate();
  useEffect(() => {
    const getUser = () => {
      const headers: any = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      };
      fetch(`${import.meta.env.VITE_APP_BASE_URL}auth/twitter/loginSuccess`, {
        method: "GET",
        credentials: "include",
        headers,
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error("auth failed");
        })
        .then((response) => {
          console.log(response);
          //   setAuthState({
          //     ...authState,
          //     user: response,
          //     isFetching: false,
          //     error: false,
          //   });
          //   navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  return (
    <>
      <div className={style.box}>
        <img src={Logo} alt="logo" />
      </div>
    </>
  );
};

export default AuthReq;
