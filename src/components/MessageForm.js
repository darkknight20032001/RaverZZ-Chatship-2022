import React, { useState } from "react";
import Attachment from "./svg/Attachment";
import Func from "./svg/Func";
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
function MessageForm({ HandleSubmit, text, setText, setAttach, attach }) {
 
 const Navigation = useNavigate();
  return (
    <form className="message_form" onSubmit={HandleSubmit}>
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => {
          setAttach(event.target.files[0]);
          
        }}
      />
     
      <div>
        <input
          type="text"
          placeholder="Enter Message"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
      </div>
      <div>
        <button className="btn">{text || attach ? "Send" : "Write something..."}</button>
      </div>
    </form>
  );
}

export default MessageForm;
