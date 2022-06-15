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
  const [apiEndpointPaciente, setApiEndpointPaciente] = useState('')
  const [apiResponsePaciente, setApiResponsePaciente] = useState(
    ''
  )
  const [selectedAccessControlLevelPaciente, setSelectedAccessControlLevel] =
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

    setApiEndpointPaciente('POST /api/info-paciente/infopaciente')
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
    setApiResponsePaciente(data)
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

    setApiEndpointPaciente('PUT /api/info-paciente/actualizar-paciente')
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
    setApiResponsePaciente('Los datos han sido actualizados exitosamente')
  }

  const createPaciente = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointPaciente('PUT /api/info-paciente/registrar-paciente')
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
    setApiResponsePaciente('El paciente se ha registrado con exito')
  }

  const consultaPacientes = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('POST /api/info-paciente/consultar-pacientes')
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
    setApiResponsePaciente(data)
    // console.log('holi', data)
    return data
  }

  const consultaTrabajadores = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('POST /api/info-paciente/consultar-trabajadores')
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
    setApiResponsePaciente(data)
    // console.log('HOLA',data)
    return data
  }

  const cambEstado = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('PUT /api/info-paciente/cambEst-usuario')
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
    setApiResponsePaciente('Los datos han sido actualizados exitosamente')
  }

  const getPacienteInfo = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointPaciente('POST /api/info-paciente/consultar-paciente-porid')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/consultar-paciente-porid`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setApiResponsePaciente(data)
    return data
  }

  const getHM = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('POST /api/info-paciente/getHM')

    const config = {
      url: `${apiServerUrl}/api/info-paciente/getHM`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponsePaciente(data)
    return data
  }

  return {
    selectedAccessControlLevelPaciente,
    apiEndpointPaciente,
    apiResponsePaciente,
    getInfoPaciente,
    updatePaciente,
    createPaciente,
    consultaPacientes,
    consultaTrabajadores,
    cambEstado,
    getPacienteInfo,
    getHM
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
