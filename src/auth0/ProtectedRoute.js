import React, { useEffect } from 'react'
import { useAuthApi } from '../hooks/authResponses'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'

export default function ProtectedRoute ({ component, ...args }) {
  const { user, logout } = useAuth0()
  const { getUserInfo } = useAuthApi()
  const nav = useNavigate()
  useEffect(() => {
    async function fetchData () {
      const tipo = window.localStorage.getItem('tipo')
      getUserInfo(user.sub).then((data) => {
        if (data.tipo_usuario.localeCompare('noregistro') === 0) {
          nav(`/dashboard/registro${tipo}`)
          window.localStorage.setItem('isRegistrated', false)
        } else if ((tipo.localeCompare(data.tipo_usuario) !== 0 || !data.estado)) {
          logout({
            returnTo: window.location.origin
          })
        } else {
          window.localStorage.setItem('isRegistrated', true)
        }
      })
    }
    fetchData()
  }, [])
  const Component = withAuthenticationRequired(component, args)
  return <Component />
}
