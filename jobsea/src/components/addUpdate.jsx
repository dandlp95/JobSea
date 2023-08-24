import React, { useEffect, useState } from 'react'
import { useStatusOptions } from '../customHooks/useStatusOptions'
import addUpdateCSS from './addUpdate.module.css'

const AddUpdate = props => {
  const [updateForm, setUpdateForm] = useState({
    eventDate: '',
    eventTime: '',
    notes: '',
    statusId: ''
  })
  const statusOptions = useStatusOptions()

  const [eventDateQuestion, setEventDateQuestion] = useState()

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <label for=''></label>
        </div>
      </form>
    </div>
  )
}

export default AddUpdate