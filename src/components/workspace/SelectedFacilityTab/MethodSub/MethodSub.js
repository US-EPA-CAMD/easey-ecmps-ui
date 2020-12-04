import React from 'react';
import "./MethodSub.css";
const MethodSub = ({title}) => {
    return (
        <div className="methodHeader">
        <div className ="methodTitle">{title}</div>
        <button className="rectBTN">⊕ Add {title}</button>
      </div>
    )
}

export default MethodSub
