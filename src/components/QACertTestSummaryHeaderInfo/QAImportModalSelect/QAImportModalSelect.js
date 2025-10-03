import React, { useState, useEffect } from "react";
import DropdownSelection from "../../DropdownSelection/DropdownSelection";

const QAImportModalSelect = ({ setImportTypeSelection, entityType = "TEST"}) => {
  const getSelectOptions = () => {
    const baseOptions = [
    { key: "select", name: "Select Data Type to Import" },
    { key: "file", name: "Import from File" }
  ];

   // Only add historical option for TEST entity
    if (entityType === "TEST") {
      return [...baseOptions, { key: "historical", name: "Import Historical Data" }];
    }

    return baseOptions;
  };

  const getCaption = () => {
    switch(entityType) {
      case "TEST":
        return "Import Historical or File Data";
      case "QCE":
      case "TEE":
        return "Import File Data";
      default:
        return "Import File Data";
    }
  };

  const selectOptions = getSelectOptions();
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    setImportTypeSelection(selectOptions[selection]["key"]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  return (
    <DropdownSelection
      caption={getCaption()}
      options={selectOptions}
      viewKey={"name"}
      selectKey={"key"}
      initialSelection={selection}
      selectionHandler={(value) => setSelection(value[0])}
    />
  );
};

export default QAImportModalSelect;
