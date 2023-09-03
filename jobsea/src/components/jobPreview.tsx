import React, { ReactComponentElement, useEffect, useState } from 'react'
import jobPreviewCSS from './jobPreview.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md'
import apiService from '../utilities/ApiService'
import Button from './button'
import { ApplicationDTO } from '../customTypes/responseTypes'
import UpdatesApiService from '../utilities/UpdatesApiService'
import { PathParams } from '../customTypes/requestTypes'
import { UpdateDTO } from '../customTypes/responseTypes'
import ApplicationsApiService from '../utilities/ApplicationsApiService'
import Update from './update'

type Props = {
  job: ApplicationDTO,
  reRenderParentFunction: () => void
}

const JobPreview: React.FunctionComponent<Props> = ({ job, reRenderParentFunction }) => {
  // Need to work on css, if there aren't any updates, the expandable doesn't look good.
  const [isCollapsed, setIsCollapse] = useState<boolean>(true)
  const [updates, setUpdates] = useState<UpdateDTO[]>([])
  const [latestUpdate, setLatestUpdate] = useState<UpdateDTO | null>()
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>()

  useEffect(() => {
    const getUpdates = () => {
      const userId = localStorage.getItem('userId')

      const params: PathParams = {
        userId: userId ? parseInt(userId) : 0,
        applicationId: job.applicationId
      }

      UpdatesApiService.getUpdates('users/{userId}/applications/{applicationId}/updates', params).then(response => {
        if (response.result !== null) {
          const responseUpdates: UpdateDTO[] = response.result
          setUpdates(responseUpdates)
          responseUpdates.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
          setLatestUpdate(responseUpdates[0])
        }
        // throw an error if result is null
      })
    }
    getUpdates()
  }, [])

  const handleToggle = () => {
    setIsCollapse(!isCollapsed)
  }

  const deleteApplication = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (userId !== null) {
        const pathParams: PathParams = {
          userId: parseInt(userId),
          applicationId: job.applicationId
        }

        const response = await ApplicationsApiService.deleteApplication('users/{userId}/applications/{applicationId}', pathParams)
        if (response.ok) {
          alert('Application Deleted')
          reRenderParentFunction()
        }
      }
    } catch (err) {
      console.error(err)
      alert('Error deleting application')
    }
  }

  const addUpdate = () => {
    try {
      // Not implemented yet
    } catch (err) {

    }
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
          className={`${jobPreviewCSS.previewContainer} ${!isCollapsed ? jobPreviewCSS.flattenBorder : ''
            }`}
        >
          <div className={jobPreviewCSS.flexContainer}>
            <div>
              Position: <span>{job.jobTitle}</span>
            </div>
            <div>
              Status:{' '}
              <span>{latestUpdate && latestUpdate.status.statusName}</span>
            </div>
            <div>
              Company: <span>{job.company}</span>
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
                  <span className={jobPreviewCSS.updateDate}>
                    {new Date(update.created).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={jobPreviewCSS.buttons}>
            <Button btnText='Add Update' styleRules={buttonStyleRules} clickAction={addUpdate} />
            <Button
              btnText='Delete'
              styleRules={buttonStyleRules}
              clickAction={deleteApplication}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPreview
