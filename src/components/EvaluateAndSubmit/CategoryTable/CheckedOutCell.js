import React from 'react';
import PropTypes from 'prop-types';
import { LockSharp } from "@material-ui/icons";

const CheckedOutCell = ({ checkedOutBy }) => {
  return (
    <div className="grid-row">
      <div>
        <div>{checkedOutBy !== "" && <LockSharp />}</div>
        <div className="checkOutBy">{checkedOutBy}</div>
      </div>
    </div>
  );
};

CheckedOutCell.propTypes = {
  checkedOutBy: PropTypes.string
};


export default React.memo(CheckedOutCell);