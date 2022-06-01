import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useState } from 'react'
import { useEnv } from '../context/env.context'

export const AccessControlLevel = {
  PUBLIC: 'public',
  PROTECTED: 'requires-authentication'
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

  // const getPublicResource = async (setkk) => {
  //   setSelectedAccessControlLevel(AccessControlLevel.PUBLIC)
  //   console.log(user)
  //   setApiEndpoint('post /api/messages/public')

  //   const config = {
  //     url: `${apiServerUrl}/api/messages/public`,
  //     method: 'post',
  //     headers: {
  //       'content-type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     },
  //     data: {
  //       firstName: 'Fred'
  //     }

  //   }

  //   const data = await makeRequest({ config })

  //   setkk(JSON.stringify(data, null, 2))
  //   // setApiResponse(JSON.stringify(data, null, 2))
  //   // console.log(apiResponse)
  // }

  const getUserInfo = async (userId) => {
    setSelectedAccessControlLevel(AccessControlLevel.PROTECTED)

    setApiEndpoint('GET /api/messages/protected')

    const config = {
      url: `${apiServerUrl}/api/auth/getInfo`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        userId
      }
    }

    return await makeRequest({ config, authenticated: true })
    // console.log(data)
    // setApiResponse(JSON.stringify(data, null, 2))
    // console.log(apiResponse)
  }

  return {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,
    getUserInfo

  }
}
