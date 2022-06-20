
export default function (dias, diaSeleccionado) {
  // console.log(dias[0].dia, diaSeleccionado)
  let horas
  if (dias.length !== 0) {
    for (let x = 0; x < dias.length; x = x + 1) {
      if (dias[x].dia === diaSeleccionado) {
        const inicio = dias[x].inicioturno.split('T')[1]
        const final = dias[x].finturno.split('T')[1]
        const horaInicio = inicio.split('Z')[0]
        const horaFinal = final.split('Z')[0]
        console.log(horaInicio, horaFinal)
        console.log(diaSeleccionado, dias[x].dia)
      }
    }
  }
  return horas
}
