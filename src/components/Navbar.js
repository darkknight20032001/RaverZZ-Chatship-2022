import { async } from "@firebase/util";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { auth, db } from "../firebase";
function Navbar() {
  const {User} = useContext(AuthContext);
  const Navigation = useNavigate();
  const HandleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    Navigation("/login");
  };
  return (
    <nav>
      <h3>
        <Link to="/">Messenger</Link>
      </h3>
      <div>
        {User ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={HandleSignout} className="btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
