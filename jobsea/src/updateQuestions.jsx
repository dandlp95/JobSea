import React, { useEffect, useState } from 'react'
import { useStatusOptions } from '../customHooks/useStatusOptions'

const UpdateQuestions = props => {
  const statusOptions = useStatusOptions()


  return (
    <div className={props.radioCSS}>
      Select your current's application status:
      {statusOptions &&
        statusOptions.map(statusOption => (
          <div>
            <label>
              <input
                type='radio'
                value={statusOption.statusId}
                checked={props.selectedRadioOption == statusOption.statusId}
                onChange={props.handleRadioOptionChange} //handleRadioOptionChange
              />
              {statusOption.statusName}
            </label>
          </div>
        ))}
      {eventDateQuestion && (
        <div className={props.eventDateCSS}>
          <div>
            <label for='eventDate'>{props.eventDateQuestion} </label>
            <input
              type='date'
              name='eventDate'
              value={props.eventDate}
              onChange={props.handlEventDateChange} //handlEventDate
            />
          </div>
          <br></br>
          {eventDateQuestion == interviewQuestion ? (
            <div>
              <label for='eventTime'>Time (optional): </label>
              <input
                type='time'
                name='eventTime'
                value={props.eventTime}
                onChange={props.handleTimeChange} //handleTimeChange
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  )
}

export default UpdateQuestions
