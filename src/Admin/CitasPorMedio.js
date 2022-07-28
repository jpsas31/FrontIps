import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useExternalApi } from '../hooks/InfoAdminResponse'
import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import Container from '@mui/material/Container'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function CitasPorMedio () {
  const { handleSubmit: getFechas, register: registro } = useForm()
  const [datos, setDatos] = useState({})

  const {
    getCitaPorMedio
  } = useExternalApi()
  const data = {
    labels: datos.labels,
    datasets: [{
      data: datos.values,
      backgroundColor: [
        '#FF6384',
        '#63FF84',
        '#f57c00'
      ]
    }]
  }

  const options = {
    responsive: true
  }

  const onSubmit = data => {
    getCitaPorMedio(data).then(async (res) => { setDatos(res) })
  }

  useEffect(() => {
    // getCitaPorMedio().then(async (res) => { setDatos(res) })
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <form onSubmit={getFechas(onSubmit)}>
        <Paper width = '100%' elevation = {2} sx = {{ padding: 10 }} >
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item xs = {5}>
                <TextField fullWidth id="Finicio" label="" helperText = "Fecha de Inicio" variant="outlined" type = "date"
                {...registro('Finicio', { required: true })}/>
            </Grid>

            <Grid item xs = {5}>
                <TextField fullWidth id="Ffinal" label="" helperText = "Fecha de Finalizacion" variant="outlined" type = "date"
                {...registro('Ffinal', { required: true })}/>
            </Grid>

                <Grid item xs = {8}>
                <div>
                    <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 10 }} >
                        <Pie data = {data} options = {options}/>
                    </Container>
                </div>
                </Grid>
                <Grid item xs = {5}>
                    <Button variant="contained" type = "submit" onClick={getFechas(onSubmit)} >Enviar</Button>
                </Grid>
          </Grid>
        </Paper>
        </form>

    </div>
  )
}
