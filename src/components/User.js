import React, { useEffect, useState } from "react";
import Img from "../bhagatsingh.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const User = ({ CurrentUser,  user, selectUser, chat, setChat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");
  const [Select, setSelect] = useState(false);

  useEffect(() => {
    const id =
      CurrentUser > user2 ? `${CurrentUser + user2}` : `${user2 + CurrentUser}`;
    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub();
  }, []);

  return (
    <div
      className={`user_wrapper`}
      onClick={() => {
        if(!Select)
        {
        selectUser(user);
        }
        else{
          setChat(null);
        }
                
      }}
    >
    <div style={{backgroundColor: 'red'}}
     onClick={()=>{
       window.confirm(`Do you want to block ${user.name}???`);
       if(window.confirm)
       {
         setSelect(true);
       }
     }}
     >{Select?"Blocked":"Block"}</div>
      <div className="user_info">
      
        <div className="user_detail">
          <img src={user.avatar || Img} alt="avatar" className="avatar" />
          <h4>{user.name}</h4>
          {data?.from !== CurrentUser && data?.unread && (
            <small className="unread">New</small>
          )}
        </div>
        <div
          className={`user_status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
      {data && (
        <p className="truncate">
          <strong>{data.from === CurrentUser ? "Me:" : null}</strong>
          {data.text}
        </p>
      )}
    </div>
  );
};

export default User;
