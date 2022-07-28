import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import MenuItem from '@mui/material/MenuItem'

export const ButtonT = ({ titulo, action, returnTo }) => {
  const { loginWithRedirect } = useAuth0()

  return (
    <MenuItem className="button__sign-up" variant="outlined" size="small" onClick={() => {
      window.localStorage.setItem('tipo', titulo)
      loginWithRedirect({
        screen_hint: action,
        appState: {
          returnTo
        }
      })
    }}>
      {titulo}
    </MenuItem>

  )
}

/* <form onsubmit="return false;" method="post">
<div class="form-group">
 <label for="name">Email</label>
  <input
    type="email"
    class="form-control"
    id="email"
    style="border: 1px solid #CAC9C9;
border-radius: 10px;"
    placeholder="Ingrese su email">

</div>
<div class="form-group">
  <label for="name">Contraseña</label>
  <input
    type="password"
    class="form-control"
    id="password"
    style="border: 1px solid #CAC9C9;
border-radius: 10px;"
    placeholder="Ingrese su contraseña">
</div>
<div class="captcha-container form-group"></div>
<button
  type="submit"
  id="btn-login"
  class="btn btn-primary btn-block"
        style="background:#1E54DF;">
    INICIAR SESIÓN
</button>
<button
  type="button"
  id="btn-signup"
  class="btn btn-default btn-block">
    Registrarse
</button>
<hr>
<button
  type="button"
  id="btn-google"
  class="btn btn-default btn-danger btn-block">
    Iniciar Sesión con Google
</button>
<button
  type="button"
  id="btn-recover"
  class="btn btn-default btn-block"
        style="background:#1E54DF;">
    Recuperar contraseña
</button>

</form> */

// document.getElementById("formUser").appendChild( <form onsubmit="return false;" method="post">
// <div class="form-group">
//  <label for="name">Email</label>
//   <input
//     type="email"
//     class="form-control"
//     id="email"
//     style="border: 1px solid #CAC9C9;
// border-radius: 10px;"
//     placeholder="Ingrese su email">

// </div>
// <div class="form-group">
//   <label for="name">Contraseña</label>
//   <input
//     type="password"
//     class="form-control"
//     id="password"
//     style="border: 1px solid #CAC9C9;
// border-radius: 10px;"
//     placeholder="Ingrese su contraseña">
// </div>
// <div class="captcha-container form-group"></div>
//  <button
//   type="submit"
//   id="btn-login"
//   class="btn btn-primary btn-block"
//         style="background:#1E54DF;">
//     INICIAR SESIÓN
// </button>
// <button
//   type="button"
//   id="btn-signup"
//   class="btn btn-default btn-block">
//     Registrarse
// </button>
// <hr>
// <button
//   type="button"
//   id="btn-google"
//   class="btn btn-default btn-danger btn-block">
//     Iniciar Sesión con Google
// </button>
// <button
//   type="button"
//   id="btn-recover"
//   class="btn btn-default btn-block"
//         style="background:#1E54DF;">
//     Recuperar contraseña
// </button>

// </form>)
