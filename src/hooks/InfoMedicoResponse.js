import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useState } from 'react'
import { useEnv } from '../context/env.context'
import Dia from '../components/Dia'

export const AccessControlLevel = {
  PUBLIC: 'public',
  PROTECTED: 'requires-authentication'
  // RBAC: 'requires-role-permission',
  // CORS: 'requires-cors-allowed-method'
}

export const useExternalApi = () => {
  const [apiEndpointMedico, setApiEndpointMedico] = useState('')
  const [apiResponseMedico, setApiResponseMedico] = useState(
    ''
  )
  const [selectedAccessControlLevelMedico, setSelectedAccessControlLevelMedico] =
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
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('PUT /api/info-medico/registrar-medico')
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

    setApiResponseMedico('Los datos se han enviado correctamente')
  }

  const getInfoMedico = async (datos, setAdmin) => {
    console.log(datos)
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('POST /api/info-medico/infomedico')
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
    setApiResponseMedico(data)
    setAdmin(data)
    console.log(data)
  }

  const updateMedico = async (datos, key) => {
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('PUT /api/info-medico/actualizar-medico')
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
    setApiResponseMedico('Los datos han sido actualizados exitosamente')
  }

  const getMedicosByEspecialidad = async (datos, setMedicos) => {
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('POST /api/info-medico/infomedico-byespecialidad')
    const config = {
      url: `${apiServerUrl}/api/info-medico/infomedico-byespecialidad`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_especialidad: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setMedicos(data)
    return data
  }

  const getCitasByEspecialidad = async (datos, setPrecio) => {
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('POST /api/info-medico/infocita-byespecialidad')
    const config = {
      url: `${apiServerUrl}/api/info-medico/infocita-byespecialidad`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_especialidad: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setPrecio(data)
    return data
  }

  const getTurnosByMedico = async (datos, setDias) => {
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)
    console.log(datos)
    setApiEndpointMedico('POST /api/info-medico/infoturno-bymedico')
    const config = {
      url: `${apiServerUrl}/api/info-medico/infoturno-bymedico`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setDias(Dia(data))
    return data
  }

  return {
    selectedAccessControlLevelMedico,
    apiEndpointMedico,
    apiResponseMedico,
    createMedico,
    getInfoMedico,
    updateMedico,
    getMedicosByEspecialidad,
    getCitasByEspecialidad,
    getTurnosByMedico
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
