import React, { useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import Image from '../button.jpg'
function Message({ msg, CurrentUser, DeleteMessage }) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  const [Letter, setLetter] = useState(msg);
  
  return Letter ? (
    <div
      ref={scrollRef}
      className={`message_wrapper ${Letter.from === CurrentUser ? "own" : ""}`}
    >
      <p
        
        
        className={Letter.from === CurrentUser ? "me" : "friend"}
      >
        {Letter.media && <img src={Letter.media} alt={Letter.text} />}
        {Letter.text}
        <br />
        <small>
          <Moment fromNow={Letter.createdAt.toDate()} />
        </small>
      </p>
       
        <img src={Image} onClick={()=>{
          window.confirm("Delete for me???");
          if(window.confirm)
          {
            setLetter(null);
          }
        }} className="Deletion"  />
        
        
      
   
    </div>
  ) : null;
}

export default Message;
