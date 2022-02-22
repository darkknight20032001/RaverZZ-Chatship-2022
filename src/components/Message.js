import React, { useEffect, useRef } from "react";
import Moment from "react-moment";
function Message({ msg , CurrentUser }) {
    const scrollRef = useRef();
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    } , [msg]);
  return (
    <div ref={scrollRef} className={`message_wrapper ${msg.from === CurrentUser ? "own" : ""}`}>
      <p className={msg.from === CurrentUser ? "me" : "friend"}>
        {msg.media && <img src={msg.media} alt={msg.text} />}
        {msg.text}
        <br />
        <small>
          <Moment fromNow={msg.createdAt.toDate()} />
        </small>
      </p>
    </div>
  );
}

export default Message;
