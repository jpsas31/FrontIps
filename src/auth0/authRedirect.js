import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { useAuthApi } from '../hooks/authResponses'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from '../context/user.context'
export default function AuthRedirect ({ Component, tipo }) {
  const [userType, setUserType] = useContext(UserContext)
  useEffect(() => {
    setUserType(window.localStorage.getItem('titulo'))
  }, [])
  const nav = useNavigate()
  const { user } = useAuth0()
  const { getUserInfo } = useAuthApi()
  useEffect(() => {
    async function fetchData () {
      getUserInfo(user.sub).then((data) => {
        if (data.logins_count !== 1 || tipo.localeCompare(window.localStorage.getItem('titulo')) !== 0) {
          nav('/')
        }
      })
    }
    fetchData()
  }, [])
  return <Component authId={user.sub} authEmail={user.email}/>
}
