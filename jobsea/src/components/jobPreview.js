import React from "react";
import jobPreviewCSS from "./jobPreview.module.css";
import { MdKeyboardArrowDown } from "react-icons/md"
import Button from "./button";

const JobPreview = (props) => {

  const buttonStyleRules = {
    padding: "0.75rem",
    backgroundColor: "#7981A4",
    fontSize: "1rem",
    width: "9rem"
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
      <div className={jobPreviewCSS.previewContainer}>
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
        <div className={jobPreviewCSS.arrowIcon}><MdKeyboardArrowDown /></div>
      </div>
      <div className={jobPreviewCSS.applicationDetails}>
        HELLOW WORLD
        <div className={jobPreviewCSS.buttons}>
          <Button btnText="Add Update" styleRules={buttonStyleRules} />
          <Button btnText="Delete" styleRules={buttonStyleRules} />
        </div>
      </div>
    </div>
  );
};

export default JobPreview;