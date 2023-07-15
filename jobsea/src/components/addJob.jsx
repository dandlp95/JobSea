import React, { useState, useEffect } from 'react'
import AddJobCSS from './addJob.module.css'
import Button from './button'

const AddJob = () => {
  const [selectedRadioOption, setSelectedRadioOption] = useState()
  const [position, setPosition] = useState()
  const [company, setCompany] = useState()
  const [link, setLink] = useState()
  const [comments, setComments] = useState()
  const [salary, setSalary] = useState()
  const [location, setLocation] = useState()
  const [statusOptions, setStatusOptions] = useState()
  const [eventDate, setEventDate] = useState()
  const [eventDateQuestion, setEventDateQuestion] = useState()

  useEffect(() => {
    const getStatusOptions = async () => {
      const options = {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
      }
      const response = await fetch(
        'https://localhost:7283' + '/jobsea/JobApplication/GetStatusOptions',
        options
      )
      if (response.ok) {
        const responseObject = await response.json()
        console.log(responseObject)
        setStatusOptions(responseObject.result)
      }
    }
    getStatusOptions()
  }, [])

  const handleRadioOptionChange = event => {
    setSelectedRadioOption(event.target.value)
    setQuestion(event.target.value)
  }

  const handlePositionChange = event => {
    setPosition(event.target.value)
  }

  const handleCompanyChange = event => {
    setCompany(event.target.value)
  }

  const handleLinkChange = event => {
    setLink(event.target.value)
  }

  const handleCommentChange = event => {
    setComments(event.target.value)
  }

  const handleSalaryChange = event => {
    setSalary(event.target.value)
  }

  const handleLocationChange = event => {
    setLocation(event.target.value)
  }

  const handlEventDate = event => {
    setEventDate(event.target.value)
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
        company: company,
        jobTitle: position,
        salary: salary,
        location: location,
        link: link,
        comments: comments,
        firstUpdate: {
          eventDate: eventDate,
          notes: comments,
          statusId: selectedRadioOption
        },
        userId: userId
      })
    }

    const response = await fetch(
      'https://localhost:7283' + '/jobsea/JobApplication/CreateApplication',
      options
    )

    if (response.ok) {
      // This is a placeholder
      alert('Success')
      clearCreateApplicationForm()
    }
  }

  const clearCreateApplicationForm = () => {
    setSelectedRadioOption()
    setPosition()
    setCompany()
    setLink()
    setComments()
    setSalary()
    setLocation()
    setEventDate()
  }

  return (
    <div className={AddJobCSS.AddJobCSS}>
      <form>
        <div>
          <label for='position'>Enter the name of your position</label>
          <input
            required
            type='text'
            name='position'
            onChange={handlePositionChange}
          />
        </div>
        <div>
          <label for='company'>Enter the Company name: </label>
          <input
            required
            type='text'
            name='company'
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
                    checked={selectedRadioOption == statusOption.statusId}
                    onChange={handleRadioOptionChange}
                  />
                  {statusOption.statusName}
                </label>
              </div>
            ))}
          {eventDateQuestion && (
            <div>
              <label for='eventDate'>{eventDateQuestion} </label>
              <input type='date' name='eventDate' onChange={handlEventDate} />
            </div>
          )}
        </div>
        <div>
          <label for='salary'>Salary: </label>
          <input type='number' name='salary' onChange={handleSalaryChange} />
        </div>
        <div>
          <label for='location'>Location: </label>
          <input type='text' name='location' onChange={handleLocationChange} />
        </div>
        <div>
          <label for='link'>Enter the url where you found this job: </label>
          <input type='text' name='link' onChange={handleLinkChange} />
        </div>
        <div>
          <label for='comment'>Additional notes: </label>
          <input type='text' name='comment' onChange={handleCommentChange} />
        </div>
        <Button btnText="Create Application" clickAction={sendRequest}/>
      </form>
    </div>
  )
}

export default AddJob
