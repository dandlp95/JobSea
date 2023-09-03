import React, { ChangeEventHandler, useEffect, useState } from 'react'
import useStatusOptions from '../customHooks/useStatusOptions'
import UpdateQuestions from './updateQuestions'
import addUpdateCSS from './update.module.css'
import questions from '../utilities/questions'
import CommentTextarea from './CommentTextarea'
import Button from './button'
import UpdatesApiService from '../utilities/UpdatesApiService'
import { PathParams } from '../customTypes/requestTypes'
import { UpdateRequestDTO } from '../customTypes/requestTypes'
import { StatusOption, UpdateDTO } from '../customTypes/responseTypes'

type Props = {
  editMode: boolean
  applicationId: number
  updateId: number | null
  closeComponentFunction: (isSubmmited:boolean) => void
}

const userId = localStorage.getItem('userId')

const AddUpdate: React.FunctionComponent<Props> = ({
  editMode,
  applicationId,
  updateId,
  closeComponentFunction
}) => {
  const [updateForm, setUpdateForm] = useState<UpdateRequestDTO>({
    eventDate: '',
    eventTime: '',
    notes: '',
    statusId: 0
  })
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode)
  const [eventDateQuestion, setEventDateQuestion] = useState<string>()
  const [updateEntityId, setUpdateEntityId] = useState<number | null>(updateId ? updateId : null)
  const [updateSubmitted, setUpdateSubmitted] = useState(false)
  const statusOptions: StatusOption[] = useStatusOptions()

  useEffect(() => {
    const getUpdate = async (params: PathParams) => {
      try {
        const responseUpdate = (
          await UpdatesApiService.getSingle(
            'users/{userId}/applications/{applicationId}/updates/{updateId}',
            params
          )
        ).result
        if (responseUpdate) {
          setUpdateForm({
            eventDate: responseUpdate.eventDate,
            eventTime: responseUpdate.eventTime,
            notes: responseUpdate.notes,
            statusId: parseInt(responseUpdate.status.statusId)
          })
        }
      } catch (err) { }
    }
    if (updateEntityId && userId) {
      const params: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId,
        updateId: updateEntityId
      }
      getUpdate(params)
    }
  }, [])

  const handleRadioOptionChange: ChangeEventHandler<HTMLInputElement> = event => {
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

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = event => {
    setUpdateForm({ ...updateForm, eventTime: event.target.value })
  }

  const handlEventDate: ChangeEventHandler<HTMLInputElement> = event => {
    setUpdateForm({ ...updateForm, eventDate: event.target.value })
  }

  const handleNotesChange: ChangeEventHandler<HTMLInputElement> = event => {
    setUpdateForm({ ...updateForm, notes: event.target.value })
  }

  const createUpdate = () => {
    if (userId) {
      const pathParams: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId
      }

      UpdatesApiService.post(
        'users/{userId}/applications/{applicationId}/updates',
        pathParams,
        updateForm
      ).then(response => {
        if (response.result) {
          setUpdateEntityId(response.result.updateId)
        }
        // Determines if parent function rerenders
        setUpdateSubmitted(true)
      })
    }
  }

  const updateUpdate = () => {
    if (userId && updateEntityId) {
      const pathParams: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId,
        updateId: updateEntityId
      }
      UpdatesApiService.put(
        'users/{userId}/applications/{applicationId}/updates/{updateId}',
        pathParams,
        updateForm
      ).then(response => {
        setIsEditMode(false)
        // Determines if parent function rerenders
        setUpdateSubmitted(true)
      })
    }
  }

  const closeComponent = () => {
    closeComponentFunction(updateSubmitted)
  }

  const activateEditMode = () => {
    setIsEditMode(true)
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
        {isEditMode ? (
          <Button btnText='Save' clickAction={updateEntityId ? updateUpdate : createUpdate} />
        ) : (
          <Button btnText='Edit' clickAction={activateEditMode} />
        )}
        <Button btnText='Close' clickAction={closeComponent} />
      </form>
    </div>
  )
}

export default AddUpdate
