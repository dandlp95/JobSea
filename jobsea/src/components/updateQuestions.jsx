import React, { useEffect, useState } from 'react'
import { useStatusOptions } from '../customHooks/useStatusOptions'

const UpdateQuestions = props => {
  const hiredQuestion = 'Congrats! When will your new job start?'
  const interviewQuestion = 'When will your interview be?'
  const waitingQuestion = 'When do you estimate you will hear back from them?'

  return (
    props.statusOptions && (
      <div className={props.radioCSS}>
        Select your current's application status:
        {props.statusOptions &&
          props.statusOptions.map(statusOption => (
            <div>
              <label>
                <input
                  type='radio'
                  value={statusOption.statusId}
                  checked={props.selectedRadioOption == statusOption.statusId}
                  onChange={props.handleRadioOptionChange}
                />
                {statusOption.statusName}
              </label>
            </div>
          ))}
        {props.eventDateQuestion && (
          <div className={props.eventDateCSS}>
            <div>
              <label for='eventDate'>{props.eventDateQuestion} </label>
              <input
                type='date'
                name='eventDate'
                value={props.eventDate}
                onChange={props.handlEventDateChange}
              />
            </div>
            <br></br>
            {props.eventDateQuestion == interviewQuestion ? (
              <div>
                <label for='eventTime'>Time (optional): </label>
                <input
                  type='time'
                  name='eventTime'
                  value={props.eventTime}
                  onChange={props.handleTimeChange}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    )
  )
}

export default UpdateQuestions
