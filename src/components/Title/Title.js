import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";

const Title = () => {
  return (
    <div className="display-flex flex-align-center text-base-lightest">
      <FontAwesomeIcon
        icon={faThLarge}
        className="text-white font-body-lg margin-right-2"
      />
      <h5 className="padding-0 padding-left-5px"> EASEY-In Dashboard</h5>
    </div>
  );
};

export default Title;
