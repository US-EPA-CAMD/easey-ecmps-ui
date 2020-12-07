import React from 'react'
import './SelectBox.css';
const SelectBox = ({caption, options}) => {
    return (
        <div>
            <div className="mpSelect">
            {caption}{": "} <br /> 
            <select >
                {options.map((info) => {
                    return ( 
                    <option key={info.unitId} value={info.unitId} onClick={console.log(info.unitId)}>{info.unitId} </option>
                    )
                })}
            </select>
          </div>
        </div>
    )
}

export default SelectBox
