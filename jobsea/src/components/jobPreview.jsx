import React, { useEffect, useState } from 'react'
import jobPreviewCSS from './jobPreview.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Button from './button'

const JobPreview = props => {
  // Need to work on css, if there aren't any updates, the expandable doesn't look good.
  const [isCollapsed, setIsCollapse] = useState(true)
  const [updates, setUpdates] = useState([])
  const [latestUpdate, setLatestUpdate] = useState()

  useEffect(() => {
    const getUpdates = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const options = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await fetch(
        'https://localhost:7283' +
          `/jobsea/JobApplication/GetApplicationUpdates/${props.job.applicationId}/${userId}`,
        options
      )
      if (response.ok) {
        const responseObject = await response.json()
        setUpdates(responseObject.result)
        // Sort in descending order
        responseObject.result.sort((a, b) => b.created - a.created)
        // Assign most recent date (first element in array after sorting)
        setLatestUpdate(responseObject.result[0])
      }
    }
    getUpdates()
  }, [])

  const handleToggle = () => {
    setIsCollapse(!isCollapsed)
  }

  const buttonStyleRules = {
    padding: '0.75rem',
    backgroundColor: '#7981A4',
    fontSize: '1rem',
    width: '9rem'
  }

  return (
    <div className={jobPreviewCSS.jobPreviewCSS}>
      <div className={jobPreviewCSS.jobContainer}>
      <div
        className={`${jobPreviewCSS.previewContainer} ${
          !isCollapsed ? jobPreviewCSS.flattenBorder : ''
        }`}
      >
        <div className={jobPreviewCSS.flexContainer}>
          <div>
            Position: <span>{props.job.jobTitle}</span>
          </div>
          <div>
            Status:{' '}
            <span>{latestUpdate && latestUpdate.status.statusName}</span>
          </div>
          <div>
            Company: <span>{props.job.company}</span>
          </div>
        </div>
        <div className={jobPreviewCSS.arrowIcon}>
          <div className={!isCollapsed && jobPreviewCSS.arrowIconRotate}>
            <MdKeyboardArrowDown onClick={handleToggle} />
          </div>
        </div>
      </div>
      <div
        className={
          isCollapsed
            ? jobPreviewCSS.applicationDetailsCollapsed
            : jobPreviewCSS.applicationDetails
        }
      >
        <div className={jobPreviewCSS.updatesContainer}>
          {updates.map(update => (
            <div className={jobPreviewCSS.updateContainer}>
              <div>
                <div> {update.notes}</div>
                <span className={jobPreviewCSS.seeMore}>See more</span>
                <span className={jobPreviewCSS.updateDate}>{update.eventDate}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={jobPreviewCSS.buttons}>
          <Button btnText='Add Update' styleRules={buttonStyleRules} />
          <Button btnText='Delete' styleRules={buttonStyleRules} />
        </div>
      </div>
      </div>
    </div>
  )
}

export default JobPreview
