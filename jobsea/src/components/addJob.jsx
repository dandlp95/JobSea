import React, { useState, useEffect } from 'react'
import AddJobCSS from './addJob.module.css'
import Button from './button'

const AddJob = props => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    salary: null,
    location: '',
    link: '',
    comments: '',
    eventDate: '',
    selectedRadioOption: ''
  })
  const [statusOptions, setStatusOptions] = useState()
  const [eventDateQuestion, setEventDateQuestion] = useState()

  useEffect(() => {
    const getStatusOptions = async () => {
      const options = {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      }
      const response = await fetch(
        'https://localhost:7283' + '/jobsea/statusOptions',
        options
      )
      if (response.ok) {
        const responseObject = await response.json()
        setStatusOptions(responseObject.result)
      }
    }
    getStatusOptions()
  }, [])

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

  const setQuestion = statusId => {
    const hiredQuestion = 'Congrats! When will your new job start?'
    const interviewQuestion = 'When will your interview be?'
    const waitingQuestion = 'When do you estimate you will hear back from them?'

    if (statusId == 1) setEventDateQuestion(hiredQuestion)
    else if (statusId == 3) setEventDateQuestion(interviewQuestion)
    else if (statusId == 5) setEventDateQuestion(waitingQuestion)
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
        company: formData.company,
        jobTitle: formData.position,
        salary: formData.salary,
        location: formData.location,
        link: formData.link,
        comments: formData.comments,
        firstUpdate: {
          eventDate: formData.eventDate,
          notes: formData.comments,
          statusId: formData.selectedRadioOption
        },
        userId: userId
      })
    }

    const response = await fetch(
      'https://localhost:7283' + `/jobsea/users/${userId}/applications`,
      options
    )
    if (response.ok) {
      alert('Success')
      clearCreateApplicationForm()
      props.reRenderParentFunction()
    } else {
      alert('error submitting form')
    }
  }

  const clearCreateApplicationForm = () => {
    setFormData({
      company: '',
      position: '',
      salary: null,
      location: '',
      link: '',
      comments: '',
      eventDate: '',
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
          <div className={AddJobCSS.RadioMenu}>
            Select your current's application status:
            {statusOptions &&
              statusOptions.map(statusOption => (
                <div>
                  <label>
                    <input
                      type='radio'
                      value={statusOption.statusId}
                      checked={
                        formData.selectedRadioOption == statusOption.statusId
                      }
                      onChange={handleRadioOptionChange}
                    />
                    {statusOption.statusName}
                  </label>
                </div>
              ))}
            {eventDateQuestion && (
              <div className={AddJobCSS.eventDateQuestion}>
                <label for='eventDate'>{eventDateQuestion} </label>
                <input
                  type='date'
                  name='eventDate'
                  value={formData.eventDate}
                  onChange={handlEventDate}
                />
              </div>
            )}
          </div>
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
            <input
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
