import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { get } from "../../utils/axiosLib";
import { logger } from "../../utils/logger";
import { useQuery } from "@tanstack/react-query";
//import { CircularProgress } from '@material-ui/core'
import Tweet from "../Tweet/Tweet";
import Loader from "../../images/loading.gif";

import style from "./Feed.module.scss";

const Feed = () => {
  const [tweets, setTweets] = useState<any>([]);
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  //const [errMsg, setErrMsg] = useState<string>("");
  const [authState] = useContext<any>(AuthContext);

  const token: string = authState.user.token;
  const user: any = authState.user.user;

  const endpoint = `${import.meta.env.VITE_APP_BASE_URL}post/tm/${user._id}`;
  const headers = {
    "auth-token": `${token}`,
    "Content-Type": "application/json",
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      get(endpoint, headers).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (data) {
      setTweets(
        //<< quick sort algorithm
        data.sort((p1: any, p2: any) => {
          return (
            new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf()
          );
        })
      );
    }
  }, [data]);

  useEffect(() => {
    const getTweets = async () => {
      //setIsLoading(true)
      try {
        const tweetsReq = await get(endpoint, headers);
        setTweets(
          //<< quick sort algorithm
          tweetsReq.data.sort((p1: any, p2: any) => {
            return (
              new Date(p2.createdAt).valueOf() -
              new Date(p1.createdAt).valueOf()
            );
          })
        );
      } catch (err: any | undefined | {}) {
        logger(err);
        //setErrMsg("Tweets aren't loading right now...")
      }
      //setIsLoading(false)
    };
    getTweets();
    logger(authState.latestTweet);
  }, [authState.latestTweet]);

  return (
    <div>
      {isLoading ? (
        <div className={style.loaderBox}>
          <img
            src={Loader}
            alt="loading..."
            style={{ height: "45px", width: "45px" }}
          />
        </div>
      ) : (
        <>
          {tweets.map((tweet: any) => (
            <Tweet key={tweet._id} tweetFull={tweet} />
          ))}
          {error && (
            <div className={style.loaderBox}>
              <p style={{ color: "#fff" }}>
                Sorry tweets aren't loading right now
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Feed;
