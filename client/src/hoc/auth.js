import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../_action/user_actions'

export default function Auth (SpecificComponent, option, adminRoute = null) {
  // option - null: 아무나 출입이 가능한 page
  //        - true: 로그인한 유저만 출입이 가능한 page
  //        - false: 로그인한 유저는 출입 불가능한 page

  // adminRoute - null: 아무나 출입이 가능한 page

  function AuthenticationCheck(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response)

        // 로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            console.log('로그인 안 함')
            navigate('/login')
          }
        } else {
          // 로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            console.log('관리자')
            navigate('/')
          } else if (option === false) {
            console.log('로그인')
            navigate('/')
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck
}