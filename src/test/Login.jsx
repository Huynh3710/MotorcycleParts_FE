import React from 'react'
import useLogin from './useLogin';

const Login = () => {
  const { login } = useLogin();
    const handleClick = () => {
      login();
    }
  return (
    <div>
        <button onClick={handleClick}>login</button>
    </div>
  )
}

export default Login