import React from 'react'
import MainListItemsAdmin from './listItemsAdmin'
import MainListItemsPaciente from './listItemsPaciente'
import MainListItemsMedico from './listItemsMedico'

export default function ListChooser () {
  const userType = window.localStorage.getItem('tipo')
  if (userType === 'Paciente') {
    return <MainListItemsPaciente />
  }
  if (userType === 'Medico') {
    return <MainListItemsMedico />
  }
  if (userType === 'Admin') {
    return <MainListItemsAdmin />
  }
}
