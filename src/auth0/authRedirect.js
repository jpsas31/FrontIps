import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuthApi } from '../hooks/authResponses'
import { useAuth0 } from '@auth0/auth0-react'
export default function AuthRedirect ({ Component, tipo }) {
  const nav = useNavigate()
  const { user } = useAuth0()
  const { getUserInfo } = useAuthApi()

  useEffect(() => {
    async function fetchData () {
      getUserInfo(user.sub).then((data) => {
        if (data.tipo_usuario.localeCompare('noregistro') !== 0 || tipo.localeCompare(window.localStorage.getItem('tipo')) !== 0) {
          nav('/')
        }
      })
    }

    fetchData()
  }, [])
  return <Component authId={user.sub} authEmail={user.email} />
}
