import { useRef, useEffect, useState } from "react";
import style from "./Conversation.module.scss";
import pic from "../../images/icons/image.svg";
import send from "../../images/icons/send.svg";
import avi from "../../images/others/avatar.jpeg";
import { get, post } from "../../utils/axiosLib";
import { logger } from "../../utils/logger";
import { format } from "timeago.js";
import { io } from "socket.io-client";

const Messenger = ({ currentChat, user }) => {
  const [messages, setMessages] = useState<any>([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef<any>();
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.users.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("SOCKET USERS", users);
    });
  }, [user]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      const res: any = await get(
        `${import.meta.env.VITE_APP_BASE_URL}message/` + currentChat?._id
      );
      setMessages(res.data);
      //console.log("cc", currentChat);
      //logger("user id>>", userId);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageObj = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.users.find((u) => u !== user._id);
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    const res: any = await post(
      `${import.meta.env.VITE_APP_BASE_URL}message/`,
      messageObj
    );
    setMessages([...messages, res.data]);
    setNewMessage("");
  };

  return (
    <>
      {/* {messages?.map((m: any) => (
          <div
            // ref={ref}
            className={
              m.senderId === currentUser.uid
                ? style.messageBoxOwner
                : style.messageBoxOther
            }
            key={m.id}
          >
            <div
              className={
                m.senderId === currentUser.uid
                  ? style.messageOwner
                  : style.messageOther
              }
            >
              <p>{m.text}</p>
            </div>
          </div>
        ))} */}
      {currentChat ? (
        <div className={style.messengerContainer}>
          <div className={style.chatMessages}>
            {messages?.map((m: any) => (
              <div
                ref={ref}
                //className={style.messageBoxOwner}
                className={
                  m.sender === user._id
                    ? style.messageBoxOwner
                    : style.messageBoxOther
                }
                key={m._id}
              >
                {m.sender !== user._id && <img src={avi} alt="avatar" />}
                <div
                  // className={style.messageOwner}
                  className={
                    m.sender === user._id
                      ? style.messageOwner
                      : style.messageOther
                  }
                >
                  <p>{m.text}</p>
                  <span>
                    {/* Tue 12:12 AM */}
                    {format(m.createdAt)}
                  </span>
                </div>
              </div>
            ))}
            {/* <div className={style.messageBoxOther}>
              <img src={avi} alt="avatar" />
              <div className={style.messageOther}>
                <p>Check check check check</p>
                <span>Tue 12:12 AM</span>
              </div>
            </div> */}
          </div>
          <div className={style.chatBtm}>
            <img src={pic} alt="add image" />
            <input
              type="text"
              placeholder="write a message.."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <img
              style={{ cursor: "pointer" }}
              onClick={handleSubmit}
              src={send}
              alt="send"
            />
          </div>
        </div>
      ) : (
        <div className={style.noMessages}>
          <h2>You have no conversations selected</h2>
          <p>Choose from your existing conversations or start a new one</p>
        </div>
      )}
    </>
  );
};

export default Messenger;
