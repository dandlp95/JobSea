import React, { useState, MouseEventHandler, ChangeEventHandler, useEffect } from 'react'
import AddJobCSS from './addJob.module.css'
import Button from './button'
import UpdateQuestions from './updateQuestions'
import useStatusOptions from '../customHooks/useStatusOptions'
import questions from '../utilities/questions'
import CommentTextarea from './CommentTextarea'
import { createApplicationApiService } from '../utilities/ApiServices/ApplicationsApiService'
import { CreateApplicationDTO, PathParams } from '../customTypes/requestTypes'
import ModalitiesApiService from '../utilities/ApiServices/ModalitiesApiService'
import { City, Modality, State } from '../customTypes/responseTypes'
import LocationForm from './LocationForm'
import FilterMenu from './filterMenu'

type Props = {
  closeComponentFunction: () => void
  reRenderParentFunction: () => void
}

type AddJobForm = {
  company: string
  position: string
  salary: string
  city: string | null
  state: string | null
  link: string | null
  comments: string | null
  eventDate: string | null
  eventTime: string | null
  selectedRadioOption: string
  modalityId: string | null
  jobDetails: string | null
}

const data: AddJobForm = {
  company: '',
  position: '',
  salary: '',
  city: null,
  state: null,
  link: '',
  jobDetails: '',
  comments: '',
  eventDate: null,
  eventTime: null,
  selectedRadioOption: '',
  modalityId: ''
}

const AddJob: React.FunctionComponent<Props> = ({
  closeComponentFunction,
  reRenderParentFunction
}) => {
  const ApplicationApiService = createApplicationApiService()
  const statusOptions = useStatusOptions()
  const [formData, setFormData] = useState(data)
  const [eventDateQuestion, setEventDateQuestion] = useState<string>()
  const [modalities, setModalities] = useState<Modality[]>([])

  useEffect(() => {
    const getModalities = async () => {
      const response = await ModalitiesApiService.getModalities()
      if (response.result) {
        setModalities(response.result)
        localStorage.setItem('modalities', JSON.stringify(response.result))
      }
    }

    const storedModalities = localStorage.getItem('modalities')
    if (storedModalities) {
      setModalities(JSON.parse(storedModalities))
    } else {
      getModalities()
    }
  }, [])

  const handleRadioOptionChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({
      ...formData,
      selectedRadioOption: event.target.value,
      eventDate: null,
      eventTime: null
    })
    setQuestion(parseInt(event.target.value))
  }

  const handleModalityChange: ChangeEventHandler<HTMLSelectElement> = event => {
    setFormData({
      ...formData,
      modalityId: event.target.value
    })
  }

  const handlePositionChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, position: event.target.value })
  }

  const handleCompanyChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, company: event.target.value })
  }

  const handleLinkChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, link: event.target.value })
  }

  const handleCommentChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, comments: event.target.value })
  }

  const handleSalaryChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, salary: event.target.value })
  }

  const handlEventDate: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, eventDate: event.target.value })
  }

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, eventTime: event.target.value })
  }

  const handleJobDetailsChange: ChangeEventHandler<HTMLInputElement> = event => {
    setFormData({ ...formData, jobDetails: event.target.value })
  }

  const handleCityChange = (inputCity: string) => {
    setFormData({ ...formData, city: inputCity })
  }

  const handleStateChange = (inputState: string) => {
    setFormData({ ...formData, state: inputState })
  }

  const setQuestion = (statusId: number) => {
    if (statusId == 1) setEventDateQuestion(questions.hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(questions.interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(questions.waitingQuestion)
    else setEventDateQuestion(undefined)
  }

  const sendRequest = async () => {
    try {
      const userId = localStorage.getItem('userId')

      if (!userId) throw new Error('Invalid userId param')

      const params: PathParams = {
        userId: parseInt(userId)
      }

      const requestBody: CreateApplicationDTO = {
        company: formData.company,
        jobTitle: formData.position,
        salary: parseInt(formData.salary),
        city: formData.city,
        state: formData.state,
        link: formData.link,
        jobDetails: formData.jobDetails,
        comments: formData.comments,
        modalityId: formData.modalityId,
        firstUpdate: {
          eventDate: formData.eventDate,
          eventTime: formData.eventTime ? formData.eventTime + ':00' : null,
          notes: formData.comments,
          statusId: parseInt(formData.selectedRadioOption)
        }
      }

      await ApplicationApiService.postApplication(
        'users/{userId}/applications',
        params,
        requestBody
      )

      alert('Success')
      clearCreateApplicationForm()
      reRenderParentFunction()
      closeComponentFunction()
    } catch (err) {
      alert('error submitting form')
    }
  }

  const clearCreateApplicationForm = () => {
    setFormData({
      company: '',
      position: '',
      salary: '',
      city: '',
      state: '',
      link: '',
      jobDetails: '',
      comments: '',
      eventDate: '',
      eventTime: '',
      modalityId: '',
      selectedRadioOption: ''
    })
    setEventDateQuestion('')
  }

  const closeComponentEventHandler: MouseEventHandler<HTMLButtonElement> = event => {
    closeComponentFunction()
  }

  return (
    statusOptions && (
      <div className={AddJobCSS.AddJobCSS}>
        <form onSubmit={e => e.preventDefault()}>
            <div>
              <label htmlFor='position'>Enter the name of your position: </label>
              <input
                required
                type='text'
                name='position'
                value={formData.position}
                onChange={handlePositionChange}
              />
            </div>
            <div>
              <label htmlFor='company'>Enter the Company name: </label>
              <input
                required
                type='text'
                name='company'
                value={formData.company}
                onChange={handleCompanyChange}
              />
            </div>
            <UpdateQuestions
              radioCSS={AddJobCSS.RadioMenu}
              selectedRadioOption={parseInt(formData.selectedRadioOption)}
              handleRadioOptionChange={handleRadioOptionChange}
              eventDateCSS={AddJobCSS.eventDateQuestion}
              eventDate={formData.eventDate}
              eventTime={formData.eventTime}
              handleTimeChange={handleTimeChange}
              eventDateQuestion={eventDateQuestion}
              statusOptions={statusOptions}
              handlEventDateChange={handlEventDate}
            />
            <div>
              <label htmlFor='salary'>Salary: </label>
              <input
                type='number'
                name='salary'
                value={formData.salary}
                onChange={handleSalaryChange}
              />
            </div>
            <div className={AddJobCSS.modalitiesContainer}>
              <label htmlFor='modalities'>Job Modality: </label>
              <select name='modalities' id='modalities' onChange={handleModalityChange}>
                <option value='default'>--Select a work modality--</option>
                {modalities.map(modality => (
                  <option value={modality.modalityId}>{modality.name}</option>
                ))}
              </select>
            </div>
            <div>
              <LocationForm getCityInput={handleCityChange} getStateInput={handleStateChange} />
            </div>
            <div>
              <label htmlFor='link'>Enter the url where you found this job: </label>
              <input
                type='text'
                name='link'
                value={formData.link ? formData.link : ''}
                onChange={handleLinkChange}
              />
            </div>{' '}
            <CommentTextarea
              labelText='Enter Job Details: '
              comments={formData.jobDetails ? formData.jobDetails : ''}
              handleCommentChange={handleJobDetailsChange}
            />
            <CommentTextarea
              labelText='Additional Notes: '
              comments={formData.comments ? formData.comments : ''}
              handleCommentChange={handleCommentChange}
            />
            <div className={AddJobCSS.buttonsDiv}>
              <Button btnText='Create Application' clickAction={sendRequest} />
              <Button btnText='Close' clickAction={closeComponentEventHandler} />
            </div>
        </form>
      </div>
    )
  )
}

export default AddJob
