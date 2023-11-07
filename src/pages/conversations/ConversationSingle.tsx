import { useState, useEffect } from "react";
import avi from "../../images/others/avatar.jpeg";
import style from "./Conversation.module.scss";
import { get } from "../../utils/axiosLib";
import { logger } from "../../utils/logger";
import { format } from "timeago.js";

const ConversationSingle = (props: any) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const senderId = props.convo.users.find((u) => u !== props.user._id);

    const getUser = async () => {
      const res: any = await get(
        `${import.meta.env.VITE_APP_BASE_URL}user?userId=` + senderId
      );
      setUser(res.data);
      logger(res);
    };
    getUser();
  }, [props.convo]);

  return (
    <div key={props.convo._id} className={style.convoBox}>
      <img src={user?.profilePicture || avi} alt="user" />
      <div className={style.convoBoxTxt}>
        <div className={style.cbtop}>
          <h3>
            {user?.name} <span>@{user?.username}</span>
          </h3>
          {/* <p>Jan 20</p> */}
        </div>

        <p className={style.cbmsg}>{format(props?.convo?.startedAt) || " "}</p>
      </div>
    </div>
  );
};

export default ConversationSingle;
