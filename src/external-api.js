import React from 'react'
import { CodeSnippet } from './code-snippet'
import { Button } from '@mui/material'
import { AccessControlLevel, useExternalApi } from './hooks/use-external-api'

export default function ExternalApi () {
  const {
    selectedAccessControlLevel,
    apiEndpoint,
    apiResponse,

    getPublicResource,
    getProtectedResource
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
              onClick={getPublicResource}
              className={`messages-grid__option ${
                selectedAccessControlLevel === AccessControlLevel.PUBLIC &&
                'messages-grid__option--active'
              }`}
            >
              Ruta publica
            </Button>
            <Button
              onClick={getProtectedResource}
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
