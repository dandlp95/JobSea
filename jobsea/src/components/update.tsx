import React, { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import useStatusOptions from '../customHooks/useStatusOptions'
import UpdateQuestions from './updateQuestions'
import addUpdateCSS from './addUpdate.module.css'
import questions from '../utilities/questions'
import CommentTextarea from './CommentTextarea'
import Button from './button'
import ApiService from '../utilities/ApiService'
import UpdatesApiService from '../utilities/UpdatesApiService'
import { PathParams } from '../customTypes/requestTypes'
import { UpdateRequestDTO } from '../customTypes/requestTypes'
import { StatusOption, UpdateDTO } from '../customTypes/responseTypes'

type Props = {
  editMode: boolean
  applicationId: number
  updateId?: number
  closeComponentFunction: (arg: boolean) => void
}

const userId = localStorage.getItem('userId')

const AddUpdate: React.FunctionComponent<Props> = ({ editMode, applicationId, updateId, closeComponentFunction }) => {
  const [updateForm, setUpdateForm] = useState<UpdateRequestDTO>({
    eventDate: '',
    eventTime: '',
    notes: '',
    statusId: 0
  })
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode)
  const [eventDateQuestion, setEventDateQuestion] = useState<string>()
  const statusOptions: StatusOption[] = useStatusOptions()

  useEffect(() => {
    const getUpdate = async (updateId: number, params: PathParams) => {
      try {
        const responseUpdate = (await UpdatesApiService.getSingle('users/{userId}/applications/{applicationId}/updates', params)).result
        if (responseUpdate) {
          setUpdateForm({
            eventDate: responseUpdate.eventDate,
            eventTime: responseUpdate.eventTime,
            notes: responseUpdate.notes,
            statusId: parseInt(responseUpdate.status.statusId)
          })
        }
      } catch (err) {

      }
    }
    if (updateId && userId) {
      const params: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId
      }
      getUpdate(updateId, params)
    }
  }, [])

  const handleRadioOptionChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedRadioOption = parseInt(event.target.value)
    setUpdateForm({ ...updateForm, statusId: selectedRadioOption })
    setQuestion(selectedRadioOption)
  }

  const setQuestion = (statusId: number) => {
    if (statusId == 1) setEventDateQuestion(questions.hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(questions.interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(questions.waitingQuestion)
    else setEventDateQuestion('')
  }

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUpdateForm({ ...updateForm, eventTime: event.target.value })
  }

  const handlEventDate: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUpdateForm({ ...updateForm, eventDate: event.target.value })
  }

  const handleNotesChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUpdateForm({ ...updateForm, notes: event.target.value })
  }

  const createUpdate = () => {
    if (userId) {
      const pathParams: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId
      }

      UpdatesApiService.post('users/{userId}/applications/{applicationId}/updates', pathParams, updateForm).then(response => {
        closeComponent()
      })
    }
  }

  const updateUpdate = () => {
    if (userId) {
      const pathParams: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId,
        updateId: updateId
      }
      UpdatesApiService.put('users/{userId}/applications/{applicationId}/updates/{updateId}', pathParams, updateForm).then(response => {
        setIsEditMode(false)
      })
    }
  }

  const closeComponent = () => {
    closeComponentFunction(false)
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
          comments={updateForm.notes ? updateForm.notes : ''}
          handleCommentChange={handleNotesChange}
          isReadonly={isEditMode ? true : false}
        />
        <Button btnText='Save' clickAction={updateId ? updateUpdate : createUpdate} />
        <Button btnText='Close' clickAction={closeComponent} />
      </form>
    </div>
  )
}

export default AddUpdate
