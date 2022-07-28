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
  const aprobarCita = async (idCita) => {
    const config = {
      url: `${apiServerUrl}/api/info-cita/aprobar-cita`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_cita: idCita
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseCita(data)
  }
  const cancelarCita = async (idCita) => {
    const config = {
      url: `${apiServerUrl}/api/info-cita/cancelar-Cita`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_cita: idCita
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseCita(data)
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

    setCita(data)
  }
  const getAllCitas = async (setCita, isAdmin) => {
    let datos = {}
    if (!isAdmin)datos = { user: user.sub }
    const config = {
      url: `${apiServerUrl}/api/info-cita/get-allcita`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: datos

    }
    const data = await makeRequest({ config, authenticated: true })
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
    cancelarCita,
    getCita,
    aprobarCita,
    createCita,
    deleteCita,
    getAllCitas
  }
}
