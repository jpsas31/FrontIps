import * as React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { AccessControlLevel, useExternalApi } from '../hooks/InfoAdminResponse'
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Container from '@mui/material/Container'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
// import CircularProgress from '@mui/material/CircularProgress'

export default function CitasPorPaciente () {
  const {
    selectedAccessControlLevelAdmin,
    // apiEndpoint,
    // apiResponseAdmin,
    getPacientesxCitaChart
  } = useExternalApi()

  const { handleSubmit: getInfoPacienteSubmit, register: registro } = useForm()
  const [info, setInfo] = useState({})
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState()

  const especialidades = ['General', 'Psicologia', 'Pediatria', 'Cardiologia', 'Dermatologia', 'Oftalmologia']

  const onSubmit = data => {
    setInfo({})
    setData()
    setVisible(false)
    getPacientesxCitaChart(data, setInfo)
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Citas asginadas por este paciente'
      }
    }
  }

  const dataLimpiada = info => {
    const datos = [0, 0, 0, 0, 0, 0]

    for (let i = 0; i < info.length; i++) {
      datos[info[i].id_tipocita - 1] = info[i]._count._all
    }

    console.log(datos)

    const data = {
      labels: especialidades,
      datasets: [
        {
          label: '',
          data: datos,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    }

    setData(data)
  }

  useEffect(() => {
    if (JSON.stringify(info) !== '{}' && info.length > 0) {
      setVisible(true)
      dataLimpiada(info)
    }
  }, [info])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <form onSubmit = {getInfoPacienteSubmit(onSubmit)}>
            <TextField
                label = "Identificación"
                inputProps={{
                  maxLength: 30
                }}
                {...registro('id', { required: true })}
                sx={{ mx: 1, my: 1, width: '20ch' }}
            />
            <TextField
                  sx={{ mx: 1, my: 1, width: '20ch' }}
                  type = "date"
                  label = "Fecha Inicial"
                  required
                  InputLabelProps={{ shrink: true }}
                  {...registro('fechaInicial', { required: true })}
                />
              <TextField
                sx={{ mx: 1, my: 1, width: '20ch' }}
                type = "date"
                label = "Fecha Final"
                required
                InputLabelProps={{ shrink: true }}
                {...registro('fechaFinal', { required: true })}
              />
            <Button onClick = { getInfoPacienteSubmit(onSubmit) } variant="contained" sx={{ mx: 1, my: 1 }}
              className={`messages-grid__option ${
                selectedAccessControlLevelAdmin === AccessControlLevel.PROTECTED &&
                'messages-grid__option--active'
              }`}>
                Consultar
            </Button>
        </form>
      </div>
      <div>
        <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', borderColor: 'lightgray', mb: 2 }} >
          {visible && <Bar options={options} data={data}/>}
        </Container>
      </div>
    </>
  )
}
