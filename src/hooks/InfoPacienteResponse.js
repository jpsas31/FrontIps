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
  const [apiResponse, setApiResponse] = useState('')
  const [selectedAccessControlLevel, setSelectedAccessControlLevel] = useState(null)

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
  // funciones api Kevin
  const getInfoPaciente = async (datos, setPaciente, setFecha) => {
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
    let apano = new Date(data.nacimiento)
    apano = apano.setDate(apano.getDate() + 1)
    setFecha(apano)
  }

  const updatePaciente = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    let apano = new Date(datos.nacimiento)
    apano = new Date(apano.setDate(apano.getDate() - 1))
    apano = apano.toISOString()

    setApiEndpoint('PUT /api/info-paciente/actualizar-paciente')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/actualizar-paciente`,
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
        nacimiento: apano
      }
    }

    await makeRequest({ config, authenticated: true })
    setApiResponse('Los datos han sido actualizados exitosamente')
  }

  const createPaciente = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpoint('POST /api/info-paciente/registrar-paciente')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/registrar-paciente`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: '1',
        tipo_id: datos.tipo_id,
        identificacion: String(datos.identificacion),
        nombre: datos.nombre,
        apellido: datos.apellido,
        direccion: datos.direccion,
        ciudad: datos.ciudad,
        telefono: datos.telefono,
        nacimiento: new Date(datos.nacimiento),
        edad: parseInt(datos.edad),
        email: datos.email,
        antecedentes: ''
      }
    }
    console.log(config)
    await makeRequest({ config, authenticated: true })
    setApiResponse('Los datos han sido ingresados con exito')
  }

  const updatePw = async (datos, key, key2, setResponsePw) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpoint('PUT /api/info-paciente/actualizar-pw')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/actualizar-pw`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_usuario: key,
        tipo_usuario: key2,
        clave: datos.fieldnewPw,
        nuevaClave: datos.newPw1,
        nuevaClave2: datos.newPw2
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponse(data)
    if (data.err === 0) {
      setResponsePw('La contraseña ha sido actualizada')
    } else {
      setResponsePw('La contraseña no ha sido actualizada')
    }
  }

  const consultaPacientes = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpoint('POST /api/info-paciente/consultar-pacientes')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/consultar-pacientes`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_usuario: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponse(data)
    // console.log('holi', data)
    return data
  }

  const consultaTrabajadores = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpoint('POST /api/info-paciente/consultar-trabajadores')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/consultar-trabajadores`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_usuario: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponse(data)
    // console.log('HOLA',data)
    return data
  }

  const cambEstado = async (datos, setResponsePw) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpoint('PUT /api/info-paciente/cambEst-usuario')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/cambEst-usuario`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_usuario: datos.id_usuario,
        estado: datos.estado
      }
    }
    await makeRequest({ config, authenticated: true })
    setApiResponse('Los datos han sido actualizados exitosamente')
  }

  return {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,
    getInfoPaciente,
    updatePaciente,
    updatePw,
    createPaciente,
    consultaPacientes,
    consultaTrabajadores,
    cambEstado
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
