import * as React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoPacienteResponse'
import { useAuth0 } from '@auth0/auth0-react'

export default function Archivos () {
  const {
    selectedAccessControlLevelPaciente,
    // apiEndpoint,
    // apiResponsePaciente,

    uploadFile,
    getFile
  } = useExternalApi()
  const { user } = useAuth0()
  const [file, setFile] = useState(null)
  // const [downloadedFile, setDownloadedFile] = useState(null)

  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  const sendHandler = () => {
    if (!file) {
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('archivo', file)
    formdata.append('usuario', user.sub)

    uploadFile(formdata)

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  const getPdf = () => {
    getFile(user.sub)
  }

  return (
    <div>
      <input id="fileinput" onChange={selectedHandler} className="form-control" type="file" />
      <Button onClick={sendHandler} className={`messages-grid__option ${selectedAccessControlLevelPaciente === AccessControlLevel.PROTECTED &&
        'messages-grid__option--active'
        }`}>Upload</Button>

      <Button onClick={getPdf} className={`messages-grid__option ${selectedAccessControlLevelPaciente === AccessControlLevel.PROTECTED &&
        'messages-grid__option--active'
        }`}>Download</Button>
    </div>
  )
}
