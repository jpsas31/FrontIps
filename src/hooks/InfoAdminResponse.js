import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useState } from 'react'
import { useEnv } from '../context/env.context'

export const AccessControlLevel = {
  PUBLIC: 'public',
  PROTECTED: 'requires-authentication'
  // RBAC: 'requires-role-permission',
  // CORS: 'requires-cors-allowed-method'
}

export const useExternalApi = () => {
  const [apiEndpoint, setApiEndpoint] = useState('')
  const [apiResponse, setApiResponse] = useState(
    ''
  )
  const [selectedAccessControlLevel, setSelectedAccessControlLevel] =
    useState(null)

  const { getAccessTokenSilently } = useAuth0()
  const { apiServerUrl } = useEnv()

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

  const createAdmin = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpoint('PUT /api/info-admin/registrar-admin')
    const config = {
      url: `${apiServerUrl}/api/info-admin/registrar-admin`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: datos.id_trabajador,
        tipo_id: datos.tipo_id,
        identificacion: datos.identificacion,
        nombre: datos.nombre,
        apellido: datos.apellido,
        direccion: datos.direccion,
        telefono: datos.telefono,
        correo: datos.correo,
        id_especialidad: datos.id_especialidad
      }
    }

    await makeRequest({ config, authenticated: true })

    setApiResponse('Los datos se han enviado correctamente')
  }

  return {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,
    createAdmin
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
