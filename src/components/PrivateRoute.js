import { reauthenticateWithRedirect } from 'firebase/auth';
import React, { useContext } from 'react'
import { BrowserRouter, Routes , Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth'

function PrivateRoute({element : Element , ...rest}) {
    const { User } = useContext(AuthContext);
    const Navigation = useNavigate();
  return (
    
            <Route {...rest} exact
            render={(props)=>{
                User?<Element {...props} />: Navigation("/login")
            }} />
  
  )
}

export default PrivateRoute