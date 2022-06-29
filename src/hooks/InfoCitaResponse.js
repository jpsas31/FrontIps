import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useState } from 'react'

export const useExternalApi = () => {
  const { getAccessTokenSilently, user } = useAuth0()
  const { apiServerUrl } = useEnv()
  const [apiResponseCita, setApiResponseCita] = useState(
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

  const getCita = async (setCita) => {
    const config = {
      url: `${apiServerUrl}/api/info-cita/get-cita`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: user.sub
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    console.log(data)
    console.log(setCita)
    setCita(data)
  }

  const deleteCita = async (datos) => {
    const config = {
      url: `${apiServerUrl}/api/info-cita/borrar-cita`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        datos
      }
    }

    setApiResponseCita(await makeRequest({ config, authenticated: true }))
  }
  const createCita = async (datos) => {
    const config = {
      url: `${apiServerUrl}/api/calendar/createMeet`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        datos
      }
    }

    setApiResponseCita(await makeRequest({ config, authenticated: true }))
  }

  return {
    apiResponseCita,
    getCita,
    createCita,
    deleteCita
  }
}
