import React from "react";
import jobPreviewCSS from "./jobPreview.module.css";

const JobPreview = (props) => {
  return (
    <div className={jobPreviewCSS.jobPreviewCSS}>
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
    </div>
  );
};

export default JobPreview;
