import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import Loading from "../components/Loading";
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (User) => {
      setUser(User);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading/>;
  }
  return (
    <AuthContext.Provider value={{ User }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
