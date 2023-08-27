import React, { useState, useEffect } from 'react'
import AddJobCSS from './addJob.module.css'
import Button from './button'
import UpdateQuestions from './updateQuestions'
import { useStatusOptions } from '../customHooks/useStatusOptions'
import questions from '../utilities/questions'

const AddJob = props => {
  const statusOptions = useStatusOptions()
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    salary: '',
    location: '',
    link: '',
    comments: '',
    eventDate: null,
    eventTime: null,
    selectedRadioOption: ''
  })
  const [eventDateQuestion, setEventDateQuestion] = useState()

  const handleRadioOptionChange = event => {
    setFormData({ ...formData, selectedRadioOption: event.target.value })
    setQuestion(event.target.value)
  }

  const handlePositionChange = event => {
    setFormData({ ...formData, position: event.target.value })
  }

  const handleCompanyChange = event => {
    setFormData({ ...formData, company: event.target.value })
  }

  const handleLinkChange = event => {
    setFormData({ ...formData, link: event.target.value })
  }

  const handleCommentChange = event => {
    setFormData({ ...formData, comments: event.target.value })
  }

  const handleSalaryChange = event => {
    setFormData({ ...formData, salary: event.target.value })
  }

  const handleLocationChange = event => {
    setFormData({ ...formData, location: event.target.value })
  }

  const handlEventDate = event => {
    setFormData({ ...formData, eventDate: event.target.value })
  }

  const handleTimeChange = event => {
    setFormData({ ...formData, eventTime: event.target.value })
  }

  const setQuestion = statusId => {
    if (statusId == 1) setEventDateQuestion(questions.hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(questions.interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(questions.waitingQuestion)
    else setEventDateQuestion()
  }

  const sendRequest = async () => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        Company: formData.company,
        JobTitle: formData.position,
        Salary: formData.salary,
        Location: formData.location,
        Link: formData.link,
        Comments: formData.comments,
        firstUpdate: {
          eventDate: formData.eventDate,
          eventTime: formData.eventTime + ':00',
          notes: formData.comments,
          statusId: formData.selectedRadioOption
        },
        userId: userId
      })
    }
    console.log(options.body)
    const response = await fetch(
      'https://localhost:7283' + `/jobsea/users/${userId}/applications`,
      options
    )
    console.log(await response.json())
    if (response.ok) {
      alert('Success')
      clearCreateApplicationForm()
      props.reRenderParentFunction()
      props.closeComponentFunction()
    } else {
      alert('error submitting form')
    }
  }

  const clearCreateApplicationForm = () => {
    setFormData({
      company: '',
      position: '',
      salary: '',
      location: '',
      link: '',
      comments: '',
      eventDate: null,
      eventTime: null,
      selectedRadioOption: ''
    })
    setEventDateQuestion()
  }

  return (
    statusOptions && (
      <div className={AddJobCSS.AddJobCSS}>
        <form onSubmit={e => e.preventDefault()}>
          <div>
            <label for='position'>Enter the name of your position: </label>
            <input
              required
              type='text'
              name='position'
              value={formData.position}
              onChange={handlePositionChange}
            />
          </div>
          <div>
            <label for='company'>Enter the Company name: </label>
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
            selectedRadioOption={formData.selectedRadioOption}
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
            <label for='salary'>Salary: </label>
            <input
              type='number'
              name='salary'
              value={formData.salary}
              onChange={handleSalaryChange}
            />
          </div>
          <div>
            <label for='location'>Location: </label>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleLocationChange}
            />
          </div>
          <div>
            <label for='link'>Enter the url where you found this job: </label>
            <input
              type='text'
              name='link'
              value={formData.link}
              onChange={handleLinkChange}
            />
          </div>
          <div>
            <label for='comment'>Additional notes: </label>
            <textarea
              type='text'
              name='comment'
              value={formData.comments}
              onChange={handleCommentChange}
            />
          </div>
          <div className={AddJobCSS.buttonsDiv}>
            <Button btnText='Create Application' clickAction={sendRequest} />
            <Button
              btnText='Close'
              clickAction={props.closeComponentFunction}
            />
          </div>
        </form>
      </div>
    )
  )
}

export default AddJob
