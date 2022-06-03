import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useExternalApi } from '../hooks/use-external-api'
import { useAuth0 } from '@auth0/auth0-react'
export default function Inicio () {
  const nav = useNavigate()
  const { user } = useAuth0()
  // const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    async function fetchData () {
      getUserInfo(user.sub).then((data) => {
        if (data.logins_count !== 1) {
          console.log('entro')
          console.log(data.logins_count)
          nav('/')
        }
      })
    }
    fetchData()
  }, [])
  const {
    getUserInfo
  } = useExternalApi()
  return (<div>
    hola no se que monda va en la ventana de inicio pero que estes muy bien
  </div>)
}
