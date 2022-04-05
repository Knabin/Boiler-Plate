import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'

function LandingPage() {
  const navigate = useNavigate()

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if (response.data.success) {
        navigate('/login')
      } else {
        alert('로그아웃하는 데 실패했습니다.');
      }
    })
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
    width: '100%', height: '100vh'}}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>Logout</button>
    </div>
  )
}

export default Auth(LandingPage, null);