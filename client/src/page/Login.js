import React from 'react';
import GoogleLoginBtn  from '../components/GoogleLoginBtn';

import './Login.css'

const Login = () => {

  return (
    <>
      <h3 style={{textAlign: 'center'}}>Login</h3>
      <form className="login-form">
        <GoogleLoginBtn />
      </form>
    </>
  );
};

export default Login;
