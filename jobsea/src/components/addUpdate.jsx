import React, { useEffect, useState } from 'react'
import { useStatusOptions } from '../customHooks/useStatusOptions'
import UpdateQuestions from './updateQuestions'
import addUpdateCSS from './addUpdate.module.css'
import questions from '../utilities/questions'
import CommentTextarea from './CommentTextarea'
import Button from './button'
import ApiService from '../utilities/ApiService'

const AddUpdate = props => {
  const [updateForm, setUpdateForm] = useState({
    eventDate: '',
    eventTime: '',
    notes: '',
    statusId: ''
  })
  const [isEditMode, setIsEditMode] = useState(false)
  const [eventDateQuestion, setEventDateQuestion] = useState()
  const statusOptions = useStatusOptions()

  useEffect(() => {
    var formAction
    var buttonText
    if (props.formAction == 'update') {
      formAction = updateUpdate
      buttonText = 'Update'
    } else if (props.formAction == 'create') {
      formAction = createUpdate
      buttonText = 'Add Update'
    }
  }, [])

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

  const createUpdate = () => {
    const userId = localStorage.getItem('userId')
    const pathParams = {
      userId: userId,
      applicationId: props.applicationId
    }
    ApiService.post('users/{userId}/applications/{applicationId}/updates').then(
      response => {}
    )
  }

  const updateUpdate = () => {
    const userId = localStorage.getItem('userId')
    const applicationId = props.applicationId
    const updateId = props.updateId
    const pathParams = {
      userId: userId,
      applicationId: applicationId,
      updateId: updateId
    }
    ApiService.put(
      'users/{userId}/applications/{applicationId}/updates/{updateId}',
      pathParams
    ).then(response => {
      setIsEditMode(false)
    })
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
          isDisabled={isEditMode && false}
        />
        <CommentTextarea
          labelText='Additional Notes: '
          comments={updateForm.notes}
          handleCommentChange={handleNotesChange}
          isReadOnly={isEditMode && false}
        />
        <Button btnText={buttonText} clickAction={formAction} />
        <Button btnText='Close' />
      </form>
    </div>
  )
}

export default AddUpdate
