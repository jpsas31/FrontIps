/* eslint-disable no-undef */
import Dia from './Dia'

const diaEntrada = [
  {
    dia: '2022-08-31',
    finturno: '2022-08-31T11:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 182,
    inicioturno: '2022-08-31T05:00:00.000Z'
  },
  {
    dia: '2022-08-30',
    finturno: '2022-08-30T17:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 183,
    inicioturno: '2022-08-30T05:00:00.000Z'
  },
  {
    dia: '2022-09-01',
    finturno: '2022-09-01T08:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 184,
    inicioturno: '2022-09-01T06:00:00.000Z'
  },
  {
    dia: '2022-08-29',
    finturno: '2022-08-29T17:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 185,
    inicioturno: '2022-08-29T05:00:00.000Z'
  },
  {
    finturno: '2022-07-26T18:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 186,
    inicioturno: '2022-07-26T06:00:00.000Z'
  }
]

const resultado = [
  {
    dia: '2022-08-31',
    finturno: '2022-08-31T11:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 182,
    inicioturno: '2022-08-31T05:00:00.000Z'
  },
  {
    dia: '2022-08-30',
    finturno: '2022-08-30T17:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 183,
    inicioturno: '2022-08-30T05:00:00.000Z'
  },
  {
    dia: '2022-09-01',
    finturno: '2022-09-01T08:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 184,
    inicioturno: '2022-09-01T06:00:00.000Z'
  },
  {
    dia: '2022-08-29',
    finturno: '2022-08-29T17:00:00.000Z',
    id_trabajador: 'google-oauth2|108197094778880665436',
    id_turno: 185,
    inicioturno: '2022-08-29T05:00:00.000Z'
  }
]

test('Probar la funcionalidad de Dia', () => {
  expect(Dia(diaEntrada)).toStrictEqual(resultado)
})

test('Probar la funcionalidad de Dia: Caso 1 ', () => {
  expect(Dia([])).toBe(resultado)
})
