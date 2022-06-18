
export default function (dias) {
  console.log(dias)
  for (let x = 0; x < dias.length; x = x + 1) {
    const array = dias[x].inicioturno.split('T')
    dias[x].dia = array[0]
  }
  return dias
}
