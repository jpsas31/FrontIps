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

  const createMedico = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpoint('PUT /api/info-medico/registrar-medico')
    const config = {
      url: `${apiServerUrl}/api/info-medico/registrar-medico`,
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

  const getInfoMedico = async (datos, setAdmin) => {
    console.log(datos)
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpoint('POST /api/info-medico/infomedico')
    const config = {
      url: `${apiServerUrl}/api/info-medico/infomedico`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setApiResponse(data)
    setAdmin(data)
    console.log(data)
  }

  const updateMedico = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    /*
    let apano = new Date(datos.nacimiento)
    apano = new Date(apano.setDate(apano.getDate() - 1))
    apano = apano.toISOString()
    */

    setApiEndpoint('PUT /api/info-medico/actualizar-medico')
    const config = {
      url: `${apiServerUrl}/api/info-medico/actualizar-medico`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: key,
        tipo_id_cargo: datos.tipo_id_cargo,
        identificacion: datos.identificacion,
        tipo_id: datos.tipo_id,
        nombre: datos.nombre,
        apellido: datos.apellido,
        direccion: datos.direccion,
        telefono: datos.telefono,
        correo: datos.correo,
        salario: datos.salario,
        id_especialidad: datos.id_especialidad,
        certificacion_del_titutlo: datos.certificacion_del_titutlo
      }
    }

    await makeRequest({ config, authenticated: true })
    setApiResponse('Los datos han sido actualizados exitosamente')
  }

  return {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,
    createMedico,
    getInfoMedico,
    updateMedico
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
