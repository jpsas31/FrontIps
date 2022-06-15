import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Editor from './EditorUse'
import Title from '../dashboard/Title'

export default function TextEditor () {
  const [texto, setTexto] = useState('<div>hola</div>')
  useEffect(() => console.log(texto), [texto])
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ flexDirection: 'column' }}
      >
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',

            width: '95.5vw'
          }}
        >
          <Title>Lo que sea </Title>
        </Paper>
        <Box
          sx={{
            height: '5vh'
          }}
        />
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            'min-height': '15vh',
            width: '95.5vw'
          }}
        >
          <Title>Antecedentes</Title>

          <Editor
            titulo="Antecedentes"
            texto={texto}
            setTexto={setTexto}
          />
        </Paper>
      </Box>
    </>
  )
}
