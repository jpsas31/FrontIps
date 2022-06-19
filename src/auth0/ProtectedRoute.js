import React, { useEffect } from 'react'
import { useAuthApi } from '../hooks/authResponses'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'

export default function ProtectedRoute ({ component, ...args }) {
  const { user, logout } = useAuth0()
  const { getUserInfo } = useAuthApi()
  useEffect(() => {
    async function fetchData () {
      let tipo = ''
      if (window.localStorage.getItem('tipo').localeCompare('Paciente') === 0) {
        tipo = 'paciente'
      } else {
        tipo = 'trabajador'
      }
      getUserInfo(user.sub).then((data) => {
        if ((tipo.localeCompare(data.tipo_usuario) !== 0 || !data.estado) && data.logins_count !== 1) {
          logout({
            returnTo: window.location.origin
          })
        }
      })
    }

    fetchData()
  }, [])
  const Component = withAuthenticationRequired(component, args)
  return <Component />
}
