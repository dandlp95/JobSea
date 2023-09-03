import React, { ChangeEventHandler, ReactComponentElement, useEffect, useState } from 'react'
import jobPreviewCSS from './jobPreview.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Button from './button'
import { ApplicationDTO } from '../customTypes/responseTypes'
import { createUpdatesApiService } from '../utilities/ApiServices/UpdatesApiService'
import { PathParams } from '../customTypes/requestTypes'
import { UpdateDTO } from '../customTypes/responseTypes'
import { createApplicationApiService } from '../utilities/ApiServices/ApplicationsApiService'
import Update from './update'

type Props = {
  job: ApplicationDTO
  reRenderParentFunction: () => void
}

const JobPreview: React.FunctionComponent<Props> = ({ job, reRenderParentFunction }) => {
  // Need to work on css, if there aren't any updates, the expandable doesn't look good.
  const UpdatesApiService = createUpdatesApiService()
  const ApplicationsApiService = createApplicationApiService()
  
  const [isCollapsed, setIsCollapse] = useState<boolean>(true)
  const [updates, setUpdates] = useState<UpdateDTO[]>([])
  const [latestUpdate, setLatestUpdate] = useState<UpdateDTO | null>()
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false)
  const [updateEditMode, setUpdateEditMode] = useState<boolean>(false)
  const [isUpdateSubmitted, setIsUpdateSubmitted] = useState<boolean>(false)
  const [update, setUpdate] = useState<UpdateDTO>()

  useEffect(() => {
    const getUpdates = async () => {
      const userId = localStorage.getItem('userId')

      const params: PathParams = {
        userId: userId ? parseInt(userId) : 0,
        applicationId: job.applicationId
      }
      const response = await UpdatesApiService.getUpdates(
        'users/{userId}/applications/{applicationId}/updates',
        params
      )
      if (response.result !== null) {
        const responseUpdates: UpdateDTO[] = response.result
        setUpdates(responseUpdates)
        responseUpdates.sort(
          (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
        )
        setLatestUpdate(responseUpdates[0])
      }
    }
    getUpdates()
  }, [isUpdateSubmitted])

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

        const response = await ApplicationsApiService.deleteApplication(
          'users/{userId}/applications/{applicationId}',
          pathParams
        )
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

  const openUpdateEditModeOn = () => {
    setUpdate(undefined)
    setUpdateEditMode(true)
    setIsUpdateOpen(true)
  }

  const openUpdateEditModeOff = (update: UpdateDTO) => {
    setUpdate(update)
    setUpdateEditMode(false)
    setIsUpdateOpen(true)
  }

  const closeUpdateComponent = (isSubmmited: boolean) => {
    setUpdate(undefined)
    setUpdateEditMode(false)
    setIsUpdateOpen(false)
    isSubmmited && reRenderParent()
  }

  const reRenderParent = () => {
    setIsUpdateSubmitted(!isUpdateSubmitted)
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
              Position: <span>{job.jobTitle}</span>
            </div>
            <div>
              Status: <span>{latestUpdate && latestUpdate.status.statusName}</span>
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
                  <span
                    className={jobPreviewCSS.seeMore}
                    onClick={e => openUpdateEditModeOff(update)}
                  >
                    See more
                  </span>
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
          {isUpdateOpen && (
            <div>
              <Update
                editMode={updateEditMode}
                applicationId={job.applicationId}
                closeComponentFunction={closeUpdateComponent}
                updateDTO={update}
              />
            </div>
          )}
          <div className={jobPreviewCSS.buttons}>
            <Button
              btnText='Add Update'
              styleRules={buttonStyleRules}
              clickAction={openUpdateEditModeOn}
            />
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
