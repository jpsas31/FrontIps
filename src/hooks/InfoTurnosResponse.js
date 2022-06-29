import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useState } from 'react'

export const useExternalApi = () => {
  const { getAccessTokenSilently, user } = useAuth0()
  const { apiServerUrl } = useEnv()
  const [apiResponseTurno, setApiResponseTurno] = useState(
    ''
  )
  const makeRequest = async (options) => {
    try {
      if (options.authenticated) {
        const token = await getAccessTokenSilently()

        options.config.headers = {
          ...options.config.headers,
          Authorization: `Bearer ${token}`
        }
      }

      const response = await axios(options.config)
      const { data } = response

      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data
      }

      return error.message
    }
  }

  const createTurno = async (datos) => {
    datos.push(user.sub)
    const config = {
      url: `${apiServerUrl}/api/info-turnos/registrar-turnos`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: datos
    }

    setApiResponseTurno(await makeRequest({ config, authenticated: true }))
  }

  const getTurnos = async (setTurnos) => {
    const config = {
      url: `${apiServerUrl}/api/info-turnos/get-turnos`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: user.sub
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setTurnos(data)
  }

  const updateTurno = async (datos, key, setResponse) => {
    const config = {
      url: `${apiServerUrl}/api/info-turnos/actualizar-turno`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        datos
      }
    }

    setApiResponseTurno(await makeRequest({ config, authenticated: true }))
  }
  const deleteTurno = async (datos) => {
    const config = {
      url: `${apiServerUrl}/api/info-turnos/borrar-turnos`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        datos
      }
    }

    setApiResponseTurno(await makeRequest({ config, authenticated: true }))
  }

  return {
    apiResponseTurno,
    getTurnos,
    updateTurno,
    createTurno,
    deleteTurno
  }
}
