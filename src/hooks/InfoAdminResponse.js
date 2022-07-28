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
  const [apiEndpointAdmin, setApiEndpointAdmin] = useState('')
  const [apiResponseAdmin, setApiResponseAdmin] = useState(
    ''
  )
  const [selectedAccessControlLevelAdmin, setSelectedAccessControlLevelAdmin] =
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
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('PUT /api/info-admin/registrar-admin')
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

    setApiResponseAdmin('Los datos se han enviado correctamente')
  }

  const getInfoAdmin = async (datos, setAdmin) => {
    //
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/infoadmin')
    const config = {
      url: `${apiServerUrl}/api/info-admin/infoadmin`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    setApiResponseAdmin(data)
    setAdmin(data)
    //
  }

  const updateAdmin = async (datos, key, setMessage) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('PUT /api/info-admin/actualizar-admin')
    const config = {
      url: `${apiServerUrl}/api/info-admin/actualizar-admin`,
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
        salario: datos.salario
      }
    }

    const data = await makeRequest({ config, authenticated: true })

    if (typeof data !== 'object') {
      setMessage('Ha ocurrido un error con la conexión, intentalo nuevamente')
    } else {
      setMessage('Los datos han sido actualizados exitosamente')
    }
  }

  const getPacientes = async (setInfo) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/listPacientes')
    const config = {
      url: `${apiServerUrl}/api/info-admin/listPacientes`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    //

    const arr = data.map((item) => {
      return [
        item.id_paciente,
        item.tipo_id,
        item.identificacion,
        item.nombre,
        item.apellido,
        item.direccion,
        item.ciudad,
        item.telefono,
        item.correo,
        item.edad,
        item.nacimiento.split('T')[0],
        item.antecdentes
      ]
    })

    //
    setInfo(arr)
  }

  const getMedicos = async (setInfo) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/listMedicos')
    const config = {
      url: `${apiServerUrl}/api/info-admin/listMedicos`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    //

    const arr = data.map((item) => {
      return [
        item.id_trabajador,
        item.tipo_id,
        item.identificacion,
        item.tipo_id_cargo,
        item.medicos.id_especialidad,
        item.nombre,
        item.apellido,
        item.direccion,
        item.telefono,
        item.correo,
        item.salario,
        item.medicos.certificacion_del_titulo
      ]
    })

    //
    setInfo(arr)
  }

  const getAdmins = async (setInfo) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/listAdmins')
    const config = {
      url: `${apiServerUrl}/api/info-admin/listAdmins`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    //

    const arr = data.map((item) => {
      return [
        item.id_trabajador,
        item.tipo_id,
        item.identificacion,
        item.tipo_id_cargo,
        item.nombre,
        item.apellido,
        item.direccion,
        item.telefono,
        item.correo,
        item.salario
      ]
    })

    //
    setInfo(arr)
  }

  return {
    selectedAccessControlLevelAdmin,
    apiEndpointAdmin,
    apiResponseAdmin,
    createAdmin,
    getInfoAdmin,
    updateAdmin,
    getPacientes,
    getAdmins,
    getMedicos
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
