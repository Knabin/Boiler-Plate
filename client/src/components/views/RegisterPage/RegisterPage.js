import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_action/user_actions'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }

  const onNameHandler = (event) => {
    setName(event.target.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/login')
        } else {
          alert('Failed to register')
        }
      })
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: '100vh'}}>
      <form style={{display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Comfirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br/>
        <button>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Auth(RegisterPage, false)