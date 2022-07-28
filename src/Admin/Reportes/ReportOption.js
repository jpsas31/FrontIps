import * as React from 'react'
import { Box, Typography } from '@mui/material'
import { Doughnut } from 'react-chartjs-2'

export default function ReportConfirm ({ optionReport, chartData, chartData2 }) {
  if (optionReport === undefined) {
    console.log('no sucede nada')
  } else {
    if (optionReport === 'Doctores') {
      return (
        <Box sx = {{ mt: 3, width: '60%', height: '10%', ml: '15rem' }}>
          <Typography variant = 'h4' sx = {{ color: 'rgb(102 102 102)', fontSize: '8 rem', padding: '3px 10px', mt: '2rem', mb: '1rem', textAlign: 'center' }}> Citas agendadas de cada doctor </Typography>
          <Doughnut data={chartData} options = {{ responsive: true, maintainAspectRatio: true }}/>
        </Box>
      )
    } else {
      return (
        <Box sx = {{ mt: 3, width: '60%', height: '10%', ml: '15rem' }}>
          <Typography variant = 'h4' sx = {{ color: 'rgb(102 102 102)', fontSize: '8 rem', padding: '3px 10px', mt: '2rem', mb: '1rem', textAlign: 'center' }}> Frecuencia de la hora de citas </Typography>
          <Doughnut data={chartData2} options = {{ responsive: true, maintainAspectRatio: true }}/>
        </Box>
      )
    }
  }
}
