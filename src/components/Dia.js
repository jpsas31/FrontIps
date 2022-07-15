export default function (dias) {
  const diasFix = []
  if (dias.length !== 0) {
    for (let x = 0; x < dias.length; x = x + 1) {
      console.log('Tiempo en milisegundos', new Date(dias[x].finturno).getTime(), new Date().getTime())
      if (new Date(dias[x].finturno).getTime() > new Date().getTime()) {
        const array = dias[x].inicioturno.split('T')
        dias[x].dia = array[0]
        diasFix.push(dias[x])
      } else {
        console.log('entre', x)
        // dias.splice(x, 1)
      }
    }
  }
  console.log(diasFix)
  return diasFix
}
