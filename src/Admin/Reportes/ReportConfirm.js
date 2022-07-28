import * as React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ToggleButtonGroup, ToggleButton, Grid, Typography, Box, Container } from '@mui/material'
import MedicationIcon from '@mui/icons-material/Medication'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import { useState, useEffect } from 'react'
import ReportConfirm from './ReportOption'
import { useExternalApi } from '../../hooks/InfoAdminResponse'
ChartJS.register(ArcElement, Tooltip, Legend)

function stringToColor (string) {
  let hash = 0
  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */
  return color
}

export default function TurnosTop () {
  const [reportOption, setReportOption] = useState('Doctores')
  const [apiRes, setApiRes] = useState([])
  const [apiRes2, setApiRes2] = useState([])
  const [labels, setLabels] = useState([])
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Doctores mas escogidos',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  })

  const [labels2, setLabels2] = useState([])
  const [data2, setData2] = useState({
    labels,
    datasets: [
      {
        label: 'Frecuencia de las horas',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  })

  const [ids, setIds] = useState([])

  const {
    getFreDoc,
    getNomDoc,
    getHorasCit
  } = useExternalApi()

  useEffect(() => {
    getFreDoc()
      .then(res => {
        console.log('respuesta de doctor', res)
        const organizado = res.sort((a, b) => b._count.id_trabajador - a._count.id_trabajador) // ordena de mayor a menor
        if (organizado.length < 20) {
          setApiRes(organizado)
        } else {
          const aux = []
          for (let i = 0; i < 20; i++) {
            aux.push(organizado[i])
          }
          setApiRes(aux)
        }
      })
    getHorasCit()
      .then(res => {
        const result = res.sort((a, b) => b._count.hora_entrada - a._count.hora_entrada) // ordena de mayor a menor
        setApiRes2(result)
      })
  }, [])

  useEffect(() => {
    if (!(apiRes === undefined)) {
      getNomDoc()
        .then(res => {
          const auxLabels = []
          const auxLabels2 = []
          if (!(res.length === 0)) {
            for (let i = 0; i < res.length; i++) {
              auxLabels.push(res[i].nombre + ' ' + res[i].apellido)
              auxLabels2.push(res[i].id_trabajador)
            }
            setIds(auxLabels2)
            setLabels(auxLabels)
          }
        })
    }
  }, [apiRes])

  useEffect(() => {
    if (!(apiRes2 === undefined)) {
      const aux = []
      if (apiRes2.length < 20) {
        for (let i = 0; i < apiRes2.length; i++) {
          apiRes2[i].hora_entrada = apiRes2[i].hora_entrada.slice(11, 16)
          aux.push(apiRes2[i].hora_entrada)
        }
      } else {
        for (let i = 0; i < 20; i++) {
          apiRes2[i].hora_entrada = apiRes2[i].hora_entrada.slice(11, 16)
          aux.push(apiRes2[i].hora_entrada)
        }
      }
      setLabels2(aux)
    }
  }, [apiRes2])

  useEffect(() => {
    const aux = []
    for (let i = 0; i < labels2.length; i++) {
      aux.push(apiRes2[i]._count.hora_entrada)
    }
    const labels = labels2
    const bgcolors = []
    const colorborders = []
    for (let i = 0; i < labels.length; i++) {
      bgcolors.push(stringToColor(labels[i]))
      colorborders.push('#FFFFFF')
    }
    setData2({
      labels,
      datasets: [
        {
          label: 'Frecuencia de la hora de citas',
          data: aux,
          backgroundColor: bgcolors,
          borderColor: colorborders,
          borderWidth: 1
        }
      ]
    })
  }, [labels2])

  useEffect(() => {
    const aux = []
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < apiRes.length; j++) {
        if (apiRes[j].id_trabajador === ids[i]) {
          aux[i] = apiRes[j]._count.id_trabajador
        } else {
          if (aux[i] === undefined) {
            aux[i] = 0
          }
        }
      }
    }
    const bgcolors = []
    const colorborders = []
    for (let i = 0; i < labels.length; i++) {
      bgcolors.push(stringToColor(labels[i]))
      colorborders.push('#FFFFFF')
    }
    setData({
      labels,
      datasets: [
        {
          label: 'Doctores mas solicitados',
          data: aux,
          backgroundColor: bgcolors,
          borderColor: colorborders,
          borderWidth: 1
        }
      ]
    })
  }, [labels])

  const handleOption = (event, newOption) => {
    if (newOption !== null) {
      setReportOption(newOption)
    }
  }
  return (
    <div>
      <Container maxWidth = 'lg' sx = {{ flexDirection: 'column', mb: 2 }}>
        <Box sx = {{ pb: 'false', maxWidth: 'lg', borderRadius: 7, mt: '1rem' }}>
          <Grid container spacing = { 2 } sx = {{ mb: '1rem' }}>
            <Grid item xs = {12}> <Typography variant = 'h4' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Reporte: 20 Turnos mas frecuentes </Typography> </Grid>
            <Grid item xs = {12}> <Typography variant = 'h5' sx = {{ padding: '3px 10px' }}> Seleccione el reporte a desplegar </Typography></Grid>
          </Grid>
          <Grid container sx = {{ justifyContent: 'center' }}>
            <ToggleButtonGroup value = {reportOption} exclusive onChange={handleOption} aria-label = 'Option asignar'>
              <ToggleButton value = 'Doctores' aria-label= 'Doctores mas frecuentes'>
                <MedicationIcon/>
                <Typography variant="h8" sx = {{ ml: '1rem' }}>Doctores</Typography>
              </ToggleButton>
              <ToggleButton value = 'Turnos' aria-label= 'Turnos mas frecuentes'>
                <TrackChangesIcon/>
                <Typography variant="h8" sx = {{ ml: '1rem' }}>Turnos</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid>
            <ReportConfirm optionReport = {reportOption} chartData = {data} chartData2 = {data2}/>
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
