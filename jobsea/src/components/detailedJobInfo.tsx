import React, { useEffect, useState } from 'react'
import DetailedJobInfoCSS from './detailedJobInfo.module.css'
import { ApplicationDTO, Modality } from '../customTypes/responseTypes'
import useModalities from '../customHooks/useModalities'

type Props = {
  job: ApplicationDTO
}

const DetailedJobInfo: React.FunctionComponent<Props> = ({ job }) => {
  const modalities: Modality[] = useModalities()
  const [modality, setModality] = useState<Modality>()

  useEffect(() => {
    const jobModality: Modality | undefined = modalities.find(
      modality => modality.modalityId === parseInt(job.modalityId ? job.modalityId : '0')
    )
    setModality(jobModality)
  }, [])

  return (
    <div>
      <div>
        <div>Salary: </div>
        <div>{job.salary}</div>
      </div>
      {modality && (
        <div>
          <div>Job Modality: </div>
          <div>{modality?.name}</div>
        </div>
      )}
      {job.city && job.state && (
        <div>
          <div>Location:</div>
          <div>
            {job.city}, {job.state}
          </div>
        </div>
      )}
      {job.jobDetails && (
        <div>
          <div>Job Details: </div>
          <div>{job.jobDetails}</div>
        </div>
      )}
      {job.link && (
        <div>
          <div>Job Post URL: </div>
          <div>{job.link}</div>
        </div>
      )}
    </div>
  )
}

export default DetailedJobInfo
