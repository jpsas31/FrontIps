export default function (dias, diaSeleccionado, citasSacadas) {
  //
  const horasOcupadas = []
  for (let j = 0; j < citasSacadas.length; j = j + 1) {
    const horasAux1 = citasSacadas[j].hora_entrada.split('T')[1]
    const horasAux2 = horasAux1.split('Z')[0]
    const horasAux3 = new Date(diaSeleccionado + ' ' + horasAux2)
    horasOcupadas.push(horasAux3)
  }
  const horas = []
  if (dias.length !== 0) {
    for (let x = 0; x < dias.length; x = x + 1) {
      if (dias[x].dia === diaSeleccionado) {
        // setear las horas
        const inicio = dias[x].inicioturno.split('T')[1]
        const final = dias[x].finturno.split('T')[1]
        const horaInicio = inicio.split('Z')[0]
        const horaFinal = final.split('Z')[0]
        // setear los dias
        const inicioDia = dias[x].inicioturno.split('T')[0]
        const finDia = dias[x].finturno.split('T')[0]
        // setear dia y hora y pasarlo a formato date
        const diaHoraInicio = inicioDia + ' ' + horaInicio
        const diaHoraFinal = finDia + ' ' + horaFinal

        const fechaInico = new Date(diaHoraInicio)
        const fechaInicioML = fechaInico.getTime()
        const fechaInicoRL = new Date(fechaInicioML - 18000000)

        const fechaFinal = new Date(diaHoraFinal)
        const fechaFinalML = fechaFinal.getTime()
        const fechaFinalRL = new Date(fechaFinalML - 18000000)

        for (let y = fechaInicoRL.getTime(); y < fechaFinalRL.getTime(); y = y + 1800000) {
          const strAux = new Date(y).toString()
          const dateAux = new Date(y)
          horas.push({ fecha: strAux.split(' ')[4], fechaDate: dateAux })
        }
      }
    }
  }

  for (let j = 0; j < horasOcupadas.length; j = j + 1) {
    for (let i = 0; i < horas.length; i = i + 1) {
      if (horasOcupadas[j].toString() === horas[i].fechaDate.toString()) {
        horas.splice(i, 1)
        //
      }
    }
  }

  return horas
}
