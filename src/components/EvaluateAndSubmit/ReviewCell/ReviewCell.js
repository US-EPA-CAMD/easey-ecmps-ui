import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "@trussworks/react-uswds";
import { LockSharp } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";

const ReviewCell = ({
  idx,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellState]);

  useEffect(() => {
    setCellState(getRowState(row, type));
  }, [row]);

  return (
    cellState && (
      <div>
        {cellState === "Lock" && <LockSharp data-testid="Lock" />}
        {cellState === "Checkbox" && (
          <Checkbox
            data-testid={`${type}-select-${idx}`}
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
              handleRowView(row, true);
            }}
          >
            View
          </Button>
        )}
      </div>
    )
  );
};

export default ReviewCell;
