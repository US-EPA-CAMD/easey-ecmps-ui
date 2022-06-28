import React, { useState, useEffect } from "react";
import DropdownSelection from "../../DropdownSelection/DropdownSelection";

const QAImportModalSelect = ({setImportTypeSelection}) => {
  const selectOptions = [
    { key: "select", name: "Select Data Type to Import" },
    { key: "file", name: "Import from File" },
    { key: "historical", name: "Import Historical Data" },
  ];
  const [selection, setSelection] = useState(0);
  useEffect(() =>{
    setImportTypeSelection(selection);
  },[selection]);

  return (
    <DropdownSelection
      options={selectOptions}
      viewKey={"name"}
      selectKey={"key"}
      initialSelection={selection}
      selectionHandler={(value) => setSelection(value[0])}
    />
  );
};

export default QAImportModalSelect;
