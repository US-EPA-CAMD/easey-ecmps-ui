import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "@trussworks/react-uswds";
import { LockSharp } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";

const ReviewCell = ({
  row,
  handleRowSelection,
  handleRowView,
  type,
  getRowState,
  setSelectAllState,
  setSelectAllVisible,
}) => {
  const [cellState, setCellState] = useState(getRowState(row, type));

  useEffect(() => {
    if (cellState === "Checkbox" && !row.selected) {
      setSelectAllState(false);
    }
    if (row.viewOnly) {
      setSelectAllVisible(false);
    }
  }, [cellState]);

  return (
    cellState && <div>
      {cellState === "Lock" && <LockSharp data-testid="Lock" />}
      {cellState === "Checkbox" && (
        <Checkbox
          data-testid="Checkbox"
          className="margin-bottom-5"
          id={`${uuidv4()}`}
          onChange={(e) => {
            handleRowSelection(row, type, e.target.checked);
          }}
          defaultChecked={row.selected}
        />
      )}
      {cellState === "View" && (
        <Button
          data-testid="ViewButton"
          onClick={() => {
            handleRowView(row);
          }}
        >
          View
        </Button>
      )}
    </div>
  );
};

export default ReviewCell;
