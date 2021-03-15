import React, { useState, useEffect } from "react";
let editableCell = false;
const setEditable = (value) => {
  editableCell = value;
};
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // returns a cell as input if the table is editable
  return editableCell ? (
    <input
      className="editableCell"
      value={value || ""}
      style={id === "col1" ? { width: "30px" } : { width: "90px" }}
      onChange={onChange}
      onBlur={onBlur}
    />
  ) : (
    <div>{initialValue}</div>
  );
};

export { EditableCell, setEditable };
