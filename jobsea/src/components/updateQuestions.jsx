import React, { useEffect, useState } from 'react'

const UpdateQuestions = props => {
  const interviewQuestion = 'When will your interview be?'

  return (
    props.statusOptions && (
      <div className={props.radioCSS}>
        Select your current's application status:
        {props.statusOptions &&
          props.statusOptions.map(statusOption => (
            <div>
              <label>
                <input
                  disabled={props.isDisabled ? props.isDisabled : false}
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
                disabled={props.isDisabled ? props.isDisabled : false}
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
                  disabled={props.isDisabled ? props.isDisabled : false}
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
