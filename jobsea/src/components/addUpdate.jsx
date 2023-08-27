import React, { useEffect, useState } from 'react'
import { useStatusOptions } from '../customHooks/useStatusOptions'
import UpdateQuestions from './updateQuestions'
import addUpdateCSS from './addUpdate.module.css'
import questions from '../utilities/questions'

const AddUpdate = props => {
  const [updateForm, setUpdateForm] = useState({
    eventDate: '',
    eventTime: '',
    notes: '',
    statusId: ''
  })

  const statusOptions = useStatusOptions()

  const [eventDateQuestion, setEventDateQuestion] = useState()

  const handleRadioOptionChange = event => {
    setFormData({ ...formData, selectedRadioOption: event.target.value })
    setQuestion(event.target.value)
  }

  const setQuestion = statusId => {
    if (statusId == 1) setEventDateQuestion(questions.hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(questions.interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(questions.waitingQuestion)
    else setEventDateQuestion()
  }

  const handleTimeChange = event => {
    setFormData({ ...formData, eventTime: event.target.value })
  }

  const handlEventDate = event => {
    setFormData({ ...formData, eventDate: event.target.value })
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
          <UpdateQuestions
            radioCSS={addUpdateCSS.RadioMenu}
            selectedRadioOption={formData.statusId}
            handleRadioOptionChange={handleRadioOptionChange}
            eventDateCSS={addUpdateCSS.eventDateQuestion}
            eventDate={updateForm.eventDate}
            eventTime={updateForm.eventTime}
            handleTimeChange={handleTimeChange}
            eventDateQuestion={eventDateQuestion}
            statusOptions={statusOptions}
            handlEventDateChange={handlEventDate}
          />
          
      </form>
    </div>
  )
}

export default AddUpdate