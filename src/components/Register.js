import React, { useState } from "react";
import { db, auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'

function Register() {
  const [Data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const History = useNavigate();
  const { name, email, password, error, loading } = Data;
  const HandleChange = (event) => {
    setData({ ...Data, [event.target.name]: event.target.value });
  };
  const HandleSubmit = async (event) => {
    event.preventDefault();
    setData({ ...Data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...Data, error: "Required Fields" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name ,
        email ,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      History('/');
    } 
    
    catch {
      setData({ ...Data, error: Error.message, loading: false });
    }

    setData({ ...Data, loading: false });
  };
  return (
    <section>
      <h3>Create an Account</h3>
      <form className="form" onSubmit={HandleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={HandleChange} />
        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={HandleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={HandleChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="btn_container">
        <button className="btn" disabled={loading}>
            {loading ? `Creating...` : `Register`}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
