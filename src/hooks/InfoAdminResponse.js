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

  const getCitaPorMedio = async (data) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/citasMedios')

    const config = {
      url: `${apiServerUrl}/api/info-admin/citasMedios`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        FInicio: data.Finicio,
        FFinal: data.Ffinal

      }
    }
    const result = await makeRequest({ config, authenticated: true })
    console.log(result)
    return result
  }

  const getCitaPorEspecialidad = async (data) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/citasEspecialidad')

    const config = {
      url: `${apiServerUrl}/api/info-admin/citasEspecialidad`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        FInicio: data.Finicio,
        FFinal: data.Ffinal

      }
    }
    const result = await makeRequest({ config, authenticated: true })
    console.log(result)
    return result
  }

  const getPacientesxCitaChart = async (data, setInfo) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    setApiEndpointAdmin('POST /api/info-admin/pacientesxcitachart')
    const config = {
      url: `${apiServerUrl}/api/info-admin/pacientesxcitachart`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id: data.id,
        fechaInicial: data.fechaInicial,
        fechaFinal: data.fechaFinal
      }
    }

    const result = await makeRequest({ config, authenticated: true })
    console.log(result)

    setInfo(result)
  }

  const getCumple = async (data, setInfo) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)

    console.log(data)
    setApiEndpointAdmin('POST /api/info-admin/cumple')
    const config = {
      url: `${apiServerUrl}/api/info-admin/cumple`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        fechaInicial: data.fechaInicial,
        fechaFinal: data.fechaFinal
      }
    }

    const result = await makeRequest({ config, authenticated: true })
    console.log(result)

    const arr = result.map((item) => {
      return [
        item.id_paciente,
        item.identificacion,
        item.nombre + ' ' + item.apellido,
        item.telefono,
        item.correo,
        item.nacimiento.split('T')[0]
      ]
    })

    // console.log(arr)
    setInfo(arr)
  }

  // FUNCIONES JULIAN

  const getCitasIntervalo = async (datos) => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)
    setApiEndpointAdmin('POST /api/info-admin/citasIntervalos')
    const config = {
      url: `${apiServerUrl}/api/info-admin/citasIntervalos`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        fechas_reg: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseAdmin(data)
    return data
  }

  const getTipoCita = async () => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)
    setApiEndpointAdmin('POST /api/info-admin/tipoCitas')
    const config = {
      url: `${apiServerUrl}/api/info-admin/tipoCitas`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseAdmin(data)
    return data
  }

  const getFreDoc = async () => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)
    setApiEndpointAdmin('POST /api/info-admin/getFreDoc')
    const config = {
      url: `${apiServerUrl}/api/info-admin/getFreDoc`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseAdmin(data)
    return data
  }

  const getNomDoc = async () => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)
    setApiEndpointAdmin('POST /api/info-admin/nombDoc')
    const config = {
      url: `${apiServerUrl}/api/info-admin/nombDoc`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseAdmin(data)
    return data
  }

  const getHorasCit = async () => {
    setSelectedAccessControlLevelAdmin(AccessControlLevel.PROTECTED)
    setApiEndpointAdmin('POST /api/info-admin/horasCit')
    const config = {
      url: `${apiServerUrl}/api/info-admin/horasCit`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponseAdmin(data)
    return data
  }

  return {
    getCitaPorMedio,
    getCitaPorEspecialidad,
    selectedAccessControlLevelAdmin,
    apiEndpointAdmin,
    apiResponseAdmin,
    createAdmin,
    getInfoAdmin,
    updateAdmin,
    getPacientes,
    getAdmins,
    getMedicos,
    getCitasIntervalo,
    getTipoCita,
    getFreDoc,
    getNomDoc,
    getHorasCit,
    getPacientesxCitaChart,
    getCumple
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
