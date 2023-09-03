import React, { ChangeEventHandler, useEffect, useState } from 'react'
import useStatusOptions from '../customHooks/useStatusOptions'
import UpdateQuestions from './updateQuestions'
import updateCSS from './update.module.css'
import questions from '../utilities/questions'
import CommentTextarea from './CommentTextarea'
import Button from './button'
import { createUpdatesApiService } from '../utilities/ApiServices/UpdatesApiService'
import { PathParams } from '../customTypes/requestTypes'
import { UpdateRequestDTO } from '../customTypes/requestTypes'
import { StatusOption, UpdateDTO } from '../customTypes/responseTypes'

type Props = {
  editMode: boolean
  updateDTO?: UpdateDTO | null
  applicationId: number
  closeComponentFunction: (isSubmmited: boolean) => void
}

const AddUpdate: React.FunctionComponent<Props> = ({
  editMode,
  updateDTO,
  applicationId,
  closeComponentFunction
}) => {
  const userId = localStorage.getItem('userId')
  const UpdatesApiService = createUpdatesApiService()
  const [updateForm, setUpdateForm] = useState<UpdateRequestDTO>({
    eventDate: updateDTO?.eventDate ? updateDTO.eventDate : null,
    eventTime: updateDTO?.eventTime ? updateDTO.eventTime : null,
    notes: updateDTO?.notes ? updateDTO.notes : null,
    statusId: updateDTO?.status?.statusId ? parseInt(updateDTO.status.statusId) : 0
  })
  const [isEditMode, setIsEditMode] = useState<boolean>(editMode)
  const [eventDateQuestion, setEventDateQuestion] = useState<string>()
  const [updateEntityId, setUpdateEntityId] = useState<number | null>(
    updateDTO?.updateId ? updateDTO?.updateId : null
  )
  const [updateSubmitted, setUpdateSubmitted] = useState(false)
  const statusOptions: StatusOption[] = useStatusOptions()

  useEffect(() => {
    if (updateDTO?.status.statusId) {
      setQuestion(parseInt(updateDTO.status.statusId))
    }
  }, [])

  const handleRadioOptionChange: ChangeEventHandler<HTMLInputElement> = event => {
    const selectedRadioOption = parseInt(event.target.value)
    setUpdateForm({ ...updateForm, statusId: selectedRadioOption, eventDate: null, eventTime: null })
    setQuestion(selectedRadioOption)
  }

  const setQuestion = (statusId: number) => {
    if (statusId == 1) setEventDateQuestion(questions.hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(questions.interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(questions.waitingQuestion)
    else setEventDateQuestion('')
  }

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = event => {
    setUpdateForm({ ...updateForm, eventTime: event.target.value + ':00' })
  }

  const handlEventDate: ChangeEventHandler<HTMLInputElement> = event => {
    setUpdateForm({ ...updateForm, eventDate: event.target.value })
  }

  const handleNotesChange: ChangeEventHandler<HTMLInputElement> = event => {
    setUpdateForm({ ...updateForm, notes: event.target.value })
  }

  const createUpdate = async () => {
    if (userId) {
      const pathParams: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId
      }

      const response = await UpdatesApiService.postUpdate(
        'users/{userId}/applications/{applicationId}/updates',
        pathParams,
        updateForm
      )

      if (response.result) {
        setUpdateEntityId(response.result.updateId)
        setIsEditMode(false)
        // Determines if parent function rerenders
        setUpdateSubmitted(true)
      }
    }
  }

  const updateUpdate = async () => {
    if (userId && updateEntityId) {
      const pathParams: PathParams = {
        userId: parseInt(userId),
        applicationId: applicationId,
        updateId: updateEntityId
      }
      const response = await UpdatesApiService.putUpdate(
        'users/{userId}/applications/{applicationId}/updates/{updateId}',
        pathParams,
        updateForm
      )
      if (response.errors === null) {
        setIsEditMode(false)
        setUpdateSubmitted(true)
      }
    }
  }

  const closeComponent = () => {
    closeComponentFunction(updateSubmitted)
  }

  const activateEditMode = () => {
    setIsEditMode(true)
  }
  console.log('update form: ', updateForm)
  return (
    <div className={updateCSS.updateContainer}>
      <form onSubmit={e => e.preventDefault()}>
        <UpdateQuestions
          radioCSS={updateCSS.RadioMenu}
          selectedRadioOption={updateForm.statusId}
          handleRadioOptionChange={handleRadioOptionChange}
          eventDateCSS={updateCSS.eventDateQuestion}
          eventDate={updateForm.eventDate}
          eventTime={updateForm.eventTime}
          handleTimeChange={handleTimeChange}
          eventDateQuestion={eventDateQuestion}
          statusOptions={statusOptions}
          handlEventDateChange={handlEventDate}
          isDisabled={isEditMode ? false : true}
        />
        <CommentTextarea
          labelText='Additional Notes: '
          comments={updateForm.notes ? updateForm.notes : ''}
          handleCommentChange={handleNotesChange}
          isReadonly={isEditMode ? false : true}
        />
        <div className={updateCSS.buttonsDiv}>
          {isEditMode ? (
            <Button btnText='Save' clickAction={updateEntityId ? updateUpdate : createUpdate} />
          ) : (
            <Button btnText='Edit' clickAction={activateEditMode} />
          )}
          <Button btnText='Close' clickAction={closeComponent} />
        </div>
      </form>
    </div>
  )
}

export default AddUpdate
