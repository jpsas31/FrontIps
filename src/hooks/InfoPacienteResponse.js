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

  // Funciones api Kevin
  const getInfoPaciente = async (datos, setPaciente) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpoint('POST /api/info-paciente/infopaciente')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/infopaciente`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setApiResponse(data)
    setPaciente(data)
    // console.log(data)
    /*
    let apano = new Date(data.nacimiento)
    apano = apano.setDate(apano.getDate() + 1)
    setFecha(apano)
    */
  }

  const updatePaciente = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    /*
    let apano = new Date(datos.nacimiento)
    apano = new Date(apano.setDate(apano.getDate() - 1))
    apano = apano.toISOString()
    */

    setApiEndpoint('PUT /api/info-paciente/actualizar-paciente')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/actualizar-paciente`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: key,
        tipo_id: datos.tipo_id,
        identificacion: datos.identificacion,
        nombre: datos.nombre,
        apellido: datos.apellido,
        direccion: datos.direccion,
        ciudad: datos.ciudad,
        telefono: datos.telefono,
        correo: datos.correo,
        edad: datos.edad,
        nacimiento: datos.nacimiento
      }
    }

    await makeRequest({ config, authenticated: true })

    setApiResponse('Los datos han sido actualizados exitosamente')
  }

  const createPaciente = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpoint('PUT /api/info-paciente/registrar-paciente')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/registrar-paciente`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: datos.id_paciente,
        tipo_id: datos.tipo_id,
        identificacion: datos.identificacion,
        nombre: datos.nombre,
        apellido: datos.apellido,
        direccion: datos.direccion,
        ciudad: datos.ciudad,
        telefono: datos.telefono,
        correo: datos.correo,
        edad: datos.edad,
        nacimiento: datos.nacimiento
      }
    }

    await makeRequest({ config, authenticated: true })

    setApiResponse('El paciente se ha registrado con exito')
  }

  return {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,
    getInfoPaciente,
    updatePaciente,
    createPaciente
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
