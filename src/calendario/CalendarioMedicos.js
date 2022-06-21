import React, { useState, useEffect, createRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import LinearProgress from '@mui/material/LinearProgress'
import { useExternalApi } from '../hooks/InfoTurnosResponse'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import * as moment from 'moment'
import './main.css'

function renderEventContent (eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

// function renderSidebarEvent (event) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }import LinearProgress from '@mui/material/LinearProgress'sible)
//   }
//   return (

//     <div className='demo-app-sidebar'>
//       <div className='demo-app-sidebar-section'>
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <label>
//           <input
//             type='checkbox'
//             checked={weekendsVisible}
//             onChange={handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className='demo-app-sidebar-section'>
//         <h2>All Events ({currentEvents.length})</h2>
//         <ul>
//           {currentEvents.map(renderSidebarEvent)}
//         </ul>
//       </div>
//     </div>

//   )
// }

export default function Calendario () {
  const [currentEvents, setCurrentEvents] = useState()
  const [currentDeleted, setDeleted] = useState([])
  const calendarRef = createRef()
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const handleClose = () => { setVisible(false) }
  const {
    apiResponseTurno,
    getTurnos,
    createTurno,
    deleteTurno
  } = useExternalApi()

  useEffect(() => {
    getTurnos(setCurrentEvents)
  }, [])

  const onSave = async (data) => {
    setVisible(true)
    if (currentDeleted.length > 0) {
      await deleteTurno(currentDeleted)
      setDeleted([])
    }
    if (currentEvents.length > 0) {
      await createTurno([...currentEvents])
    }
    if (currentEvents.length > 0 && currentDeleted.length > 0) {
      await getTurnos(setCurrentEvents)
    }

    setIsLoading(false)
  }

  function handleUpdate (addInfo) {
    const info = addInfo.event.toPlainObject()
    const aux = [...currentEvents]
    for (let i = 0; i < aux.length; i++) {
      if (parseInt(aux[i].id) === parseInt(info.id)) {
        aux[i] = info
        break
      }
    }

    setCurrentEvents(aux)
  }

  function handleDateSelect (selectInfo) {
    const calendarApi = selectInfo.view.calendar
    const dateOne = moment(selectInfo.end)
    const dateTwo = moment(selectInfo.start)
    const duration = dateOne.diff(dateTwo, 'hours', true)
    console.log(duration)
    if (duration === 6 || duration === 12 || duration === 24) {
      const info = {
        id: createEventId(),
        title: 'Turno',
        start: selectInfo.startStr,
        end: selectInfo.endStr

      }
      setCurrentEvents([...currentEvents, info])
    }
    calendarApi.unselect()
  }

  function handleEventClick (clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
      const info = clickInfo.event.toPlainObject()
      const aux = [...currentEvents]
      for (let i = 0; i < aux.length; i++) {
        if (parseInt(aux[i].id) === parseInt(clickInfo.event.id)) {
          aux.splice(i, 1)
          break
        }
      }
      setCurrentEvents(aux)
      setDeleted([...currentDeleted, info.id])
    }
  }

  if (typeof currentEvents === 'undefined') {
    return <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
  }

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={calendarRef}
          customButtons={{
            Guardar: {
              text: 'Guardar los cambios',
              click: onSave
            }
          }}
          headerToolbar={{
            left: 'prev,next today Guardar',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          }}
          slotDuration={'01:00:00'}
          expandRows = {true}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            // omitZeroMinute: true,
            hour12: false
          }}

          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            // omitZeroMinute: true,
            hour12: false
          }}
          timeFormat={'H:mm'}
          initialView='timeGridWeek'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events= {currentEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventChange={handleUpdate}

        />
         <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
          <DialogTitle>
          {isLoading && <div>Procesando</div>}
          {!isLoading && <div>Completado</div>}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
            {isLoading && <CircularProgress />}
            {!isLoading && <div></div>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    </div>
  )
}
