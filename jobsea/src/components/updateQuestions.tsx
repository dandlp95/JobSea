import React, { CSSProperties, ChangeEventHandler } from 'react'
import { StatusOption } from '../customObjects/customObjects'

type Props = {
  isDisabled: boolean
  radioCSS: string
  statusOptions: StatusOption[]
  selectedRadioOption: number
  handleRadioOptionChange: ChangeEventHandler
  eventDateQuestion: string,
  eventDateCSS: string,
  eventDate: string, // not date?
  handlEventDateChange: ChangeEventHandler,
  eventTime: string,
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
                value={eventDate}
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
                  value={eventTime}
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
