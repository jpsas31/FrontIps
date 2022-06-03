import React from 'react'
import { CodeSnippet } from './code-snippet'
import { Button } from '@mui/material'
import { AccessControlLevel, useExternalApi } from './hooks/use-external-api'
import { useAuth0 } from '@auth0/auth0-react'
export default function ExternalApi () {
  const { user } = useAuth0()

  const {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,
    getUserInfo
  } = useExternalApi()
  return (
    <div className="content-layout">
      <h1 className="content__title">External API</h1>
      <div className="content__body">

        <div className="messages-grid">
          <div className="messages-grid__header">
            Ejemplo uso API
          </div>
          <div className="messages-grid__options">
            <Button
              // onClick={async () => await getPublicResource()}
              className={`messages-grid__option ${
                selectedAccessControlLevel === AccessControlLevel.PUBLIC &&
                'messages-grid__option--active'
              }`}
            >
              Ruta publica
            </Button>
            <Button
              onClick={async () => await getUserInfo(user.sub)}
              className={`messages-grid__option ${
                selectedAccessControlLevel === AccessControlLevel.PROTECTED &&
                'messages-grid__option--active'
              }`}
            >
              Ruta protegida
            </Button>
          </div>
          <CodeSnippet title={apiEndpoint} code={apiResponse} />
        </div>
      </div>
    </div>
  )
}
