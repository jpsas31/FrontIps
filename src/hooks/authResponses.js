import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

import { useEnv } from '../context/env.context'

export const useAuthApi = () => {
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

  const getUserInfo = async (userId) => {
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
  }

  return {
    getUserInfo
  }
}
