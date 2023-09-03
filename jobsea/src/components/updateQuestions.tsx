import React, { ChangeEventHandler } from 'react'
import { StatusOption } from '../customTypes/responseTypes'

type Props = {
  isDisabled?: boolean
  radioCSS: string
  statusOptions: StatusOption[]
  selectedRadioOption: number
  handleRadioOptionChange: ChangeEventHandler
  eventDateQuestion?: string | null
  eventDateCSS: string
  eventDate?: string | null
  handlEventDateChange: ChangeEventHandler
  eventTime?: string | null
  handleTimeChange: ChangeEventHandler
}

const UpdateQuestions: React.FunctionComponent<Props> = ({
  isDisabled,
  radioCSS,
  statusOptions,
  selectedRadioOption,
  handleRadioOptionChange,
  eventDateQuestion,
  eventDateCSS,
  eventDate,
  handlEventDateChange,
  eventTime,
  handleTimeChange
}) => {
  const interviewQuestion = 'When will your interview be?'

  const formatDate = (date: string) => {
    return new Date(date).toISOString().split('T')[0]
  }
  
  return (
    statusOptions && (
      <div className={radioCSS}>
        Select your current's application status:
        {statusOptions &&
          statusOptions.map(statusOption => (
            <div>
              <label>
                <input
                  disabled={isDisabled ? isDisabled : false}
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
          <div className={eventDateCSS}>
            <div>
              <label htmlFor='eventDate'>{eventDateQuestion} </label>
              <input
                disabled={isDisabled ? isDisabled : false}
                type='date'
                name='eventDate'
                value={eventDate ? formatDate(eventDate) : ''}
                onChange={handlEventDateChange}
              />
            </div>
            <br></br>
            {eventDateQuestion == interviewQuestion ? (
              <div>
                <label htmlFor='eventTime'>Time (optional): </label>
                <input
                  disabled={isDisabled ? isDisabled : false}
                  type='time'
                  name='eventTime'
                  value={eventTime ? eventTime : ''}
                  onChange={handleTimeChange}
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
