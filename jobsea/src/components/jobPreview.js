import React, { useEffect, useState } from 'react'
import jobPreviewCSS from './jobPreview.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Button from './button'

const JobPreview = props => {
  const [isCollapsed, setIsCollapse] = useState(true)

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
      {/* <div className={jobPreviewCSS.flexContainer}>
        <div>
          Position: <span>{props.job.position}</span>
        </div>
        <div>
          Status: <span>{props.job.status}</span>
        </div>
        <div>
          Company: <span>{props.job.company}</span>
        </div>
      </div>
      <div className={jobPreviewCSS.arrowIcon}><MdKeyboardArrowDown /></div> */}
      <div
        className={`${jobPreviewCSS.previewContainer} ${
          !isCollapsed ? jobPreviewCSS.flattenBorder : ''
        }`}
      >
        <div className={jobPreviewCSS.flexContainer}>
          <div>
            Position: <span>{props.job.position}</span>
          </div>
          <div>
            Status: <span>{props.job.status}</span>
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
          {props.job.updates.map(update => (
            <div className={jobPreviewCSS.updateContainer}>
              <div>
                <div> {update.preview}</div>
                <span className={jobPreviewCSS.seeMore}>See more</span>
                <span className={jobPreviewCSS.updateDate}>06/10/2023</span>
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
  )
}

export default JobPreview
