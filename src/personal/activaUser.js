import * as React from 'react'
import { useForm } from 'react-hook-form'

export default function Personal () {
  const { register, formState: { errors }, handleSubmit } = useForm()
  
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <h2> Registrar paciente </h2>
      <form onSubmit = { handleSubmit(onSubmit) }>
        <div>
          <label> Nombre </label>
          <input type = "text" {...register('nombre', {
            required: true, 
            maxLength: 10
          }) }/>
          {errors.nombre?.type === 'required' && <p>El campo nombre es requerido</p>}
        </div>
        <div>
          <label> Direccion </label>
          <input type = "text" {...register('direccion', {
            required: true
          }) }/>
        </div>
        <div>
          <label> Edad </label>
          <input type = "text" {...register('edad')}/>
        </div>
        <div>
          <label> pais </label>
          <select {...register('pais')}>
            <option value= 'es'> España </option>
            <option value= 'it'> Italia </option>
            <option value= 'fr'> Francia </option>
            </select>
        </div>
        <input type = 'submit' value = 'Enviar' />
        </form>
    </div>
   
  )
}
