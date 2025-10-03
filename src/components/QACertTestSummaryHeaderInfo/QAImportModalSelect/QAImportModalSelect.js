import React, { useState, useEffect } from "react";
import DropdownSelection from "../../DropdownSelection/DropdownSelection";

const QAImportModalSelect = ({ setImportTypeSelection, entityType = "TEST" }) => {
  const getSelectOptions = () => {

    // For QCE/TEE: Show only "Import from File" option
    if (entityType === "QCE" || entityType === "TEE") {
      return [{ key: "file", name: "Import from File" }];
    }

    // For TEST: Show all options including placeholder and historical
    const baseOptions = [
    { key: "select", name: "Select Data Type to Import" },
    { key: "file", name: "Import from File" }
  ];

    if (entityType === "TEST") {
      return [...baseOptions, { key: "historical", name: "Import Historical Data" }];
    }

    // Default fallback
    return [{ key: "file", name: "Import from File" }];
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
