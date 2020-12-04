import React from 'react'
import './HeaderInfo.css';
const HeaderInfo = ({title}) => {
    return (
        <div className="header">
        <div className="title">{title}</div>
        <div className="accessories">
          <a>Comments</a>
          <a>Reports</a>|<button className="ovalBTN">Evaluate</button>
          <button className="ovalBTN">Submit</button>        

        </div>
        <div className="selects">
          <div className="mpSelect">
            Monitoring Plan: <br /> <select></select>
          </div>
          <div className="mpsSelect">
            Monitoring Plan Sections: <br /> <select></select>
          </div>
          <div className="statuses">
            <div className="eval"> Evaluation Status: {" passed with no errors " }</div>
            <div className="submission"> Submission Status:</div>
        </div>
        </div>

      </div>
    )
}

export default HeaderInfo
