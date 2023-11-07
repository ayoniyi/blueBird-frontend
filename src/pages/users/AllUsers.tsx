import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { get } from "../../utils/axiosLib";
import { logger } from "../../utils/logger";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AppContainer from "../../components/AppContainer/AppContainer";
import Nav from "../../components/Nav/Nav";
import RightBar from "../../components/RightBar/RightBar";
import PageContent from "../../components/PageContent/PageContent";

import style from "./Users.module.scss";
import style2 from "../../components/Feed/Feed.module.scss";
import avi from "../../images/others/avatar.jpeg";

const AllUsers = () => {
  const currentPage: string = "Users";
  const [authState] = useContext<any>(AuthContext);
  //const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any>([]);
  const userObj: any = authState.user.user;

  const endpoint = `${import.meta.env.VITE_APP_BASE_URL}user/allUsers`;

  const { isLoading, data } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () =>
      get(endpoint).then((res) => {
        return res.data;
      }),
  });
  useEffect(() => {
    setUsers(
      data?.sort((p1: any, p2: any) => {
        return (
          new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf()
        );
      })
    );
  }, [data]);

  // useEffect(() => {
  //   //const [authState, setAuthState] = useContext<any>(AuthContext);
  //   //const currentUser: any = authState.user.user;
  //   const loadUsers = async () => {
  //     try {
  //       const endpoint = `${import.meta.env.VITE_APP_BASE_URL}user/allUsers`;
  //       const usersReq = await get(endpoint);
  //       setUsers(usersReq.data.reverse());
  //       console.log("user>>", usersReq.data);

  //       //setIsLoading(false);
  //     } catch (err) {
  //       logger(err);
  //     }
  //   };
  //   loadUsers();
  // }, [userObj]);

  return (
    <div>
      <AppContainer>
        <Nav currentPage={currentPage} />
        <PageContent>
          <div className={style.container}>
            <div className={style.top}>
              <p>All Users ({users?.length})</p>
            </div>
            <div className={style.itemBox}>
              {isLoading ? (
                <div className={style2.loaderBox}>
                  <CircularProgress color="inherit" size="45px" />
                </div>
              ) : (
                <>
                  {users &&
                    users.map((user: any) => (
                      <Link to={`/profile/${user.username}`} key={user._id}>
                        <div className={style.item}>
                          <div className={style.itemImg}>
                            <img src={user.profilePicture || avi} alt="user" />
                          </div>
                          <div className={style.itemTxt}>
                            <h2>{user.name}</h2>
                            <p>@{user.username}</p>
                          </div>
                          <div className={style.itemBtn}>
                            <button>Follow</button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {users.length < 1 && (
                    <div className={style2.loaderBox}>
                      <p style={{ color: "gray" }}>No users</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </PageContent>
        <RightBar />
      </AppContainer>
    </div>
  );
};

export default AllUsers;
