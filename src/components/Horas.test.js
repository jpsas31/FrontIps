/* eslint-disable no-undef */
import Horas from './Horas'

const dias = [
  {
    dia: '2022-08-28',
    finturno: '2022-08-28T09:00:00.000Z',
    id_trabajador: 'google-oauth2|107008862642231634224',
    id_turno: 179,
    inicioturno: '2022-08-28T05:00:00.000Z'
  },
  {
    dia: '2022-08-30',
    finturno: '2022-08-30T13:00:00.000Z',
    id_trabajador: 'google-oauth2|107008862642231634224',
    id_turno: 180,
    inicioturno: '2022-08-30T09:00:00.000Z'
  },
  {
    dia: '2022-08-31',
    finturno: '2022-08-31T12:00:00.000Z',
    id_trabajador: 'google-oauth2|107008862642231634224',
    id_turno: 181,
    inicioturno: '2022-08-31T06:00:00.000Z'
  }
]

const DiaSeleccionado = '2022-08-28'

const citasSacadas = [
  {
    aprobacion: true,
    cancelada: false,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T00:00:00.000Z',
    hora_salida: '1970-01-01T00:30:00.000Z',
    id_cita: 90,
    id_mediocita: 1,
    id_paciente: 'auth0|62aca1f60a2a96cd305d9c4d',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  },
  {
    aprobacion: false,
    cancelada: true,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T01:00:00.000Z',
    hora_salida: '1970-01-01T01:30:00.000Z',
    id_cita: 98,
    id_mediocita: 1,
    id_paciente: 'google-oauth2|117325936244745258417',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  },
  {
    aprobacion: true,
    cancelada: true,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T03:00:00.000Z',
    hora_salida: '1970-01-01T03:30:00.000Z',
    id_cita: 94,
    id_mediocita: 1,
    id_paciente: 'google-oauth2|117325936244745258417',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  },
  {
    aprobacion: false,
    cancelada: true,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T01:30:00.000Z',
    hora_salida: '1970-01-01T02:00:00.000Z',
    id_cita: 96,
    id_mediocita: 1,
    id_paciente: 'auth0|62aca1f60a2a96cd305d9c4d',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  },
  {
    aprobacion: true,
    cancelada: false,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T00:30:00.000Z',
    hora_salida: '1970-01-01T01:00:00.000Z',
    id_cita: 103,
    id_mediocita: 2,
    id_paciente: 'auth0|62aca1f60a2a96cd305d9c4d',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  },
  {
    aprobacion: true,
    cancelada: false,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T03:30:00.000Z',
    hora_salida: '1970-01-01T04:00:00.000Z',
    id_cita: 97,
    id_mediocita: 1,
    id_paciente: 'auth0|62aca1f60a2a96cd305d9c4d',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  },
  {
    aprobacion: false,
    cancelada: false,
    fecha: '2022-08-28T00:00:00.000Z',
    hora_entrada: '1970-01-01T02:30:00.000Z',
    hora_salida: '1970-01-01T03:00:00.000Z',
    id_cita: 104,
    id_mediocita: 1,
    id_paciente: 'google-oauth2|111734557734355383314',
    id_tipocita: 4,
    id_trabajador: 'google-oauth2|107008862642231634224'
  }
]

const resultado = [
  {
    fecha: '02:00:00',
    fechaDate: new Date('2022-08-28T07:00:00.000Z')
  }
]

test('Probar la funcionalidad de horas', () => {
  expect(Horas(dias, DiaSeleccionado, citasSacadas)).toStrictEqual(resultado)
})

test('Probar la funcionalidad de horas: Caso 1 ', () => {
  expect(Horas([], '2022-08-28', [])).toBe(resultado)
})
