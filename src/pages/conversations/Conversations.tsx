import { useEffect, useState, useContext } from "react";
import Nav from "../../components/Nav/Nav.js";
import style from "./Conversation.module.scss";
import avi from "../../images/others/avatar.jpeg";
import { AuthContext } from "../../context/AuthContext.jsx";
import { get } from "../../utils/axiosLib.js";
import { logger } from "../../utils/logger.js";
import ConversationSingle from "./ConversationSingle.js";
import Messenger from "./Messenger.js";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [authState] = useContext<any>(AuthContext);
  const user = authState.user.user;

  useEffect(() => {
    const getConversations = async () => {
      const res: any = await get(
        `${import.meta.env.VITE_APP_BASE_URL}conversation/` + user?._id
      );
      setConversations((prevConvo) => res.data);
      // logger("convos", res.data);
      // logger("user?", user);
    };
    getConversations();
  }, []);

  return (
    <>
      <div className={style.appContainer}>
        <Nav currentPage="Conversations" />
        <div className={style.container}>
          <div className={style.left}>
            <div className={style.top}>
              <h2>Messages</h2>
            </div>
            <div className={style.leftBody}>
              {/* put convo box in its own component */}
              {conversations.map((convo) => (
                <div onClick={() => setCurrentChat(convo)}>
                  <ConversationSingle convo={convo} user={user} />
                </div>
              ))}
            </div>
          </div>
          <div className={style.right}>
            <div className={style.top}>
              <h2>User's message</h2>
            </div>
            <Messenger currentChat={currentChat} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Conversations;
