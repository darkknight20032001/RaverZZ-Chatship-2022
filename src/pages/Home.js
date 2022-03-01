import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import User from "../components/User";
import Img from "../bhagatsingh.jpg";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";
import Animate from "../components/Animate";
function Home() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState(``);
  const [attach, setAttach] = useState(``);
  const [msgs, setMsgs] = useState([]);
  const [CurrentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.uid);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let usersxx = [];
        querySnapshot.forEach((doc) => {
          usersxx.push(doc.data());
        });
        setUsers(usersxx);
      });
      return () => unsub();
    }
  }, []);

  const selectUser = async (user) => {
    setChat(user);
    const user2 = user.uid;
    const id =
      CurrentUser > user2 ? `${CurrentUser + user2}` : `${user2 + CurrentUser}`;
    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    if (docSnap.data && docSnap.data.from !== CurrentUser) {
      await updateDoc(doc(db, "lastMsg", id), {
        unread: false,
      });
    }
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (text || attach) {
      const User2 = chat.uid;
      const id =
        CurrentUser > User2
          ? `${CurrentUser + User2}`
          : `${User2 + CurrentUser}`;
          
      let url;
      if (attach) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()}-${attach.name}`
        );
        const snap = await uploadBytes(imgRef, attach);
        const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlurl;
        setAttach(``);
      }
      

      await addDoc(collection(db, "messages", id, "chat"), {
        text,
        from: CurrentUser,
        to: User2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
      });
      await setDoc(doc(db, "lastMsg", id), {
        text,
        from: CurrentUser,
        to: User2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        unread: true,
      });
      setText("");
    }
  };
  
  return auth.currentUser ? (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => {
          return (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              CurrentUser={CurrentUser}
              chat={chat}
              setChat={setChat}

            />
          );
        })}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
            {/* <img  src={chat.avatar || Img} alt="avatar" className="avatar" /> */}
              <h3>
              {chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => {
                    return (
                      <Message key={i} msg={msg} CurrentUser={CurrentUser} />
                    );
                  })
                : null}
            </div>
            <MessageForm
              HandleSubmit={HandleSubmit}
              text={text}
              setText={setText}
              setAttach={setAttach}
              attach={attach}
            />
          </>
        ) : (
          <h3 className="no_conv">Welcome to Raverzz Chatship 🙏🙏🙏</h3>
        )}
      </div>
    </div>
  ) : (
    <Animate/>
  );
}

export default Home;
