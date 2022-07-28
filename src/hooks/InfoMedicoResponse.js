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
    //
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
    //
  }

  const updateMedico = async (datos, key, setMessage) => {
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

    const data = await makeRequest({ config, authenticated: true })

    if (typeof data !== 'object') {
      setMessage('Ha ocurrido un error con la conexión, intentalo nuevamente')
    } else {
      setMessage('Los datos han sido actualizados exitosamente')
    }
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
    //
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

  const getMedicoID = async (datos) => {
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('POST /api/info-medico/getmedico')
    const config = {
      url: `${apiServerUrl}/api/info-medico/getmedico`,
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
    return data
  }

  const createHM = async (datos) => {
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)
    setApiEndpointMedico('PUT /api/info-medico/registrar-hm')
    const config = {
      url: `${apiServerUrl}/api/info-medico/registrar-hm`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: datos.id_trabajador,
        id_paciente: datos.id_paciente,
        descripcion_form: datos.descripcion_form,
        descripcion: datos.descripcion,
        fecha: datos.fecha
      }
    }

    await makeRequest({ config, authenticated: true })
    setApiResponseMedico('Los datos se han enviado correctamente')
  }

  const uploadFile = async (datos, setPdfResponse) => {
    try {
      setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)
      setApiEndpointMedico('POST /api/info-medico/subir-archivo')
      const config = {
        url: `${apiServerUrl}/api/info-medico/subir-archivo`,
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
    setSelectedAccessControlLevelMedico(AccessControlLevel.PROTECTED)

    setApiEndpointMedico('POST /api/info-medico/consultar-certificado')
    const config = {
      url: `${apiServerUrl}/api/info-medico/consultar-certificado`,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id_trabajador: datos
      }
    }

    const data = await makeRequest({ config, authenticated: true })
    // const base64Pdf = data[0].encode // Esta es para cuando tenemos el bytea
    if (JSON.stringify(data) !== '{}') {
      const base64Pdf = data.certificacion_del_titulo
      const sampleArr = base64ToArrayBuffer(base64Pdf)
      createAndDownloadBlobFile('Certificado ' + data.id, sampleArr)
    }
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
    getTurnosByMedico,
    getMedicoID,
    createHM,
    uploadFile,
    getFile
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
