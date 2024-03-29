import React, { useState, useEffect } from "react";
import DropdownSelection from "../../DropdownSelection/DropdownSelection";

const QAImportModalSelect = ({ setImportTypeSelection }) => {
  const selectOptions = [
    { key: "select", name: "Select Data Type to Import" },
    { key: "file", name: "Import from File" },
    { key: "historical", name: "Import Historical Data" },
    { key: "mats", name: "MATS PDF/XML" },
  ];
  const [selection, setSelection] = useState(0);
  useEffect(() => {
    setImportTypeSelection(selectOptions[selection]["key"]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  return (
    <DropdownSelection
      caption={"Import Historical or File Data"}
      options={selectOptions}
      viewKey={"name"}
      selectKey={"key"}
      initialSelection={selection}
      selectionHandler={(value) => setSelection(value[0])}
    />
  );
};

export default QAImportModalSelect;
