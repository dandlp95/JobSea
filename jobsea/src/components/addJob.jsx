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

  useEffect(()=>{
    const getStatusOptions = async () => {
      const options = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
      const response = await fetch("https://localhost:7283" + "/jobsea/JobApplication/GetStatusOptions")
      if(response.ok){
        const responseObject = await response.json()
        setStatusOptions(responseObject.response)
      }
    }
    getStatusOptions()
  },[])

  const handleRadioOptionChange = event => {
    setSelectedRadioOption(event.target.value)
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

  const sendRequest = async () => {
     // const token = localStorage.getItem <- GET TOKEN FROM LOCAL STORAGE

    const options = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      Authorization: `Bearer ${'TOKEN GOES HERE'}`,
      body: JSON.stringify({
        jobTitle: position,
        company: company,
        salary: salary,
        location: location,
        link: link,
        comments: comments,
        jobStatus: selectedRadioOption
      })
    }
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
          <div>
            <label>
              <input
                type='radio'
                value='applied'
                checked={selectedRadioOption === 'applied'}
                onChange={handleRadioOptionChange}
              />
              Just Applied
            </label>
          </div>
          <div>
            <label>
              <input
                type='radio'
                value='waiting'
                checked={selectedRadioOption === 'waiting'}
                onChange={handleRadioOptionChange}
              />
              Waiting to hear back
            </label>
          </div>
          <div>
            <label>
              <input
                type='radio'
                value='interviewScheduled'
                checked={selectedRadioOption === 'interviewScheduled'}
                onChange={handleRadioOptionChange}
              />
              Scheduled Interviewed
            </label>
          </div>
          <div>
            <label>
              <input
                type='radio'
                value='rejected'
                checked={selectedRadioOption === 'rejected'}
                onChange={handleRadioOptionChange}
              />
              Not selected
            </label>
          </div>
        </div>
        <div>
          <label for='salary'>Salary: </label>
          <input type='text' name='salary' onChange={handleSalaryChange}/>
        </div>
        <div>
          <label for='location'>Location: </label>
          <input type='text' name='location' onChange={handleLocationChange}/>
        </div>
        <div>
          <label for='link'>Enter the url where you found this job: </label>
          <input type='text' name='link' onChange={handleLinkChange} />
        </div>
        <div>
          <label for='comment'>Additional notes: </label>
          <input type='text' name='comment' onChange={handleCommentChange} />
        </div>
      </form>
    </div>
  )
}

export default AddJob
