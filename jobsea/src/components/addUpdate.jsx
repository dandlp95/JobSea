import React, { useEffect, useState } from 'react'
import { useStatusOptions } from '../customHooks/useStatusOptions'
import UpdateQuestions from './updateQuestions'
import addUpdateCSS from './addUpdate.module.css'
import questions from '../utilities/questions'
import CommentTextarea from './CommentTextarea'

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
    setUpdateForm({ ...updateForm, statudId: event.target.value })
    setQuestion(event.target.value)
  }

  const setQuestion = statusId => {
    if (statusId == 1) setEventDateQuestion(questions.hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(questions.interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(questions.waitingQuestion)
    else setEventDateQuestion()
  }

  const handleTimeChange = event => {
    setUpdateForm({ ...updateForm, eventTime: event.target.value })
  }

  const handlEventDate = event => {
    setUpdateForm({ ...updateForm, eventDate: event.target.value })
  }

  const handleNotesChange = event => {
    setUpdateForm({ ...updateForm, notes: event.target.value })
  }
  
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <UpdateQuestions
          radioCSS={addUpdateCSS.RadioMenu}
          selectedRadioOption={updateForm.statusId}
          handleRadioOptionChange={handleRadioOptionChange}
          eventDateCSS={addUpdateCSS.eventDateQuestion}
          eventDate={updateForm.eventDate}
          eventTime={updateForm.eventTime}
          handleTimeChange={handleTimeChange}
          eventDateQuestion={eventDateQuestion}
          statusOptions={statusOptions}
          handlEventDateChange={handlEventDate}
        />
        <CommentTextarea
          labelText='Additional Notes: '
          comments={updateForm.notes}
          handleCommentChange={handleNotesChange}
        />
      </form>
    </div>
  )
}

export default AddUpdate
