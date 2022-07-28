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

function blobToSaveAs (fileName, blob) {
  try {
    const url = window.URL.createObjectURL(blob) // --- 2.
    const link = document.createElement('a') // --- 3.
    if (link.download !== undefined) {
      link.setAttribute('href', url) // --- 3.
      link.setAttribute('download', fileName) // --- 4.
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click() // --- 4.
      document.body.removeChild(link)
    }
  } catch (e) {
    console.error('BlobToSaveAs error', e)
  }
}

export const useExternalApi = () => {
  const [apiEndpointEntrada, setApiEndpointEntrada] = useState('')
  const [apiResponseEntrada, setApiResponseEntrada] = useState(
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

  const getDeltaToHTML = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpointEntrada('POST /api/info-entradas/getHTML')
    const config = {
      url: `${apiServerUrl}/api/info-entradas/getHTML`,
      method: 'POST',
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf'
      },
      data: {
        datos_toConvert: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })

    // window.open(data, '_blank')

    const blob = new Blob([data], { type: 'application/pdf' }) // --- 1.
    blobToSaveAs('HistoriaNo' + datos[3], blob) // --- 2.

    setApiResponseEntrada(data)
  }

  const getCertificado = async (datos) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)
    setApiEndpointEntrada('POST /api/info-entradas/getCertificado')
    const config = {
      url: `${apiServerUrl}/api/info-entradas/getCertificado`,
      method: 'POST',
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf'
      },
      data: {
        datos_toConvert: datos
      }
    }
    const data = await makeRequest({ config, authenticated: true })
    console.log(data, 'que esta mandando')
    // window.open(data, '_blank')

    const blob = new Blob([data], { type: 'application/pdf' }) // --- 1.
    blobToSaveAs('CertificadoNo' + datos[3], blob) // --- 2.
    setApiResponseEntrada(data)
  }

  return {
    selectedAccessControlLevelPaciente,
    apiEndpointEntrada,
    apiResponseEntrada,
    getDeltaToHTML,
    getCertificado
    // getRbacResource,
    // checkCorsAllowedMethod
  }
}
