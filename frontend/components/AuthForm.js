import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const toggleFormMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setMessage('')
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  const submitHandler = async (evt) => {
    evt.preventDefault()
    setError('')
    setMessage('')

    if(isLogin) {
      await login()
    } else {
      try {
        const { data } = await axios.post(
          `http://localhost:3003/api/auth/register`,
          { username, password },
        )
        localStorage.setItem('token', data.token)
        setMessage(`New account created. Thanks for joining, ${username}!`)
        await login()
      } catch (err) {
        const errMsg = err?.response?.data?.message
        errMsg == 'Request failed with status code 401'
          ? setError('Invalid Login Credentials')
          : setError(errMsg)        
      }
    }

  }

  const login = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3003/api/auth/login`,
        { username, password },
      )
      localStorage.setItem('token', data.token)
      navigate('/stars')
    } catch (err) {
      const errMsg = err?.response?.data?.message
      errMsg == 'Request failed with status code 401'
        ? setError('Invalid Login Credentials')
        : setError(errMsg)
    }      
  }

  return (
    <div className="container">
      <div aria-live="polite">{message}</div>
      <div aria-live="assertive" style={{ color: 'red' }}>{error}</div>
      <h3>{isLogin ? 'Login' : 'Register'}
        <button onClick={toggleFormMode}>
          Switch to {isLogin ? 'Register' : 'Login'}
        </button>
      </h3>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button onClick={(e)=>submitHandler(e)} type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
    </div>
  )
}
