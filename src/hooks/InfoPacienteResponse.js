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

export function base64ToArrayBuffer (base64) {
  const binaryString = window.atob(base64)
  const binaryLen = binaryString.length
  const bytes = new Uint8Array(binaryLen)
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }
  return bytes
}

export function createAndDownloadBlobFile (reportName, byte) {
  const blob = new Blob([byte], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  const fileName = reportName
  link.download = fileName
  link.click()
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
    // setApiResponsePaciente(data)
    setPaciente(data)
    //
  }

  const updatePaciente = async (datos, key, setMessage) => {
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

    const data = await makeRequest({ config, authenticated: true })

    if (typeof data !== 'object') {
      setMessage('Ha ocurrido un error con la conexión, intentalo nuevamente')
    } else {
      setMessage('Los datos han sido actualizados exitosamente')
    }
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
    //
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
    //
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

  const createCita = async (datos, key) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointPaciente('PUT /api/info-paciente/crear-cita')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/crear-cita`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {

        id_tipocita: datos.id_tipocita,
        id_paciente: datos.id_paciente,
        id_trabajador: datos.id_trabajador,
        id_mediocita: datos.id_mediocita,
        hora_entrada: datos.hora_entrada,
        hora_salida: datos.hora_salida,
        fecha: datos.fecha,
        precio: datos.precio

      }
    }
    await makeRequest({ config, authenticated: true })
    setApiResponsePaciente('La cita se ha registrado con exito')
  }

  const getCitasByMedico = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('POST /api/info-paciente/consultar-citasByMedico')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/consultar-citasByMedico`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {

        id_trabajador: datos.id_trabajador,
        fecha: datos.fecha
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponsePaciente(data)
    return data
  }

  const getCitaMedios = async (datos, setMedios) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('POST /api/info-paciente/consultar-citamedio')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/consultar-citamedio`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_mediocita: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })

    setMedios(data)
    return data
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

  const getInfoHM = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointPaciente('POST /api/info-paciente/getInfoHM')

    const config = {
      url: `${apiServerUrl}/api/info-paciente/getInfoHM`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_entrada: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    setApiResponsePaciente(data)
    return data
  }

  const uploadFile = async (datos, setPdfResponse) => {
    try {
      setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

      setApiEndpointPaciente('POST /api/info-paciente/subir-archivo')
      const config = {
        url: `${apiServerUrl}/api/info-paciente/subir-archivo`,
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: datos
      }

      await makeRequest({ config, authenticated: true })
      //
      setPdfResponse('Cargado completado')
    } catch (error) {
      setPdfResponse('Hubo un error en la carga, intentalo de nuevo')
    }
  }

  const getFile = async (datos) => {
    //
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointPaciente('POST /api/info-paciente/consultar-antecedente')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/consultar-antecedente`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_paciente: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    // const base64Pdf = data[0].encode // Esta es para cuando tenemos el bytea
    if (JSON.stringify(data) !== '{}') {
      const base64Pdf = data.antecedentes
      const sampleArr = base64ToArrayBuffer(base64Pdf)
      createAndDownloadBlobFile('Antecedentes ' + data.id, sampleArr)
    }
  }

  const getPacienteAUTH = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointPaciente('POST /api/info-paciente/getpacienteporAUTH')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/getpacienteporAUTH`,
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

  const getDeltaToHTML = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointPaciente('POST /api/info-paciente/getHTML')
    const config = {
      url: `${apiServerUrl}/api/info-paciente/getHTML`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        datos_toConvert: datos
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
    createCita,
    getCitasByMedico,
    getPacienteInfo,
    getHM,
    getInfoHM,
    getCitaMedios,
    getPacienteAUTH,
    getDeltaToHTML,
    uploadFile,
    getFile
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
