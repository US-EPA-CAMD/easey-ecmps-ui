import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import MultiSelectCombobox from "../MultiSelectCombobox/MultiSelectCombobox";

const MultiSelectComboboxWrapper = ({
  value,
  create,
  modalData,
  isEditingDisabled
}) => {
  const [comboBoxItems, setComboBoxItems] = useState([]);

  useEffect(() => {
    if (value[6] && value[6].length > 0) {
      const items = value[6]
        .filter(valueItem => valueItem.code !== "")
        .map(valueItem => ({
          id: valueItem.code,
          label: valueItem.name,
          selected: !create && modalData?.[value[0]]
            ? modalData?.[value[0]].split(",").includes(valueItem.code)
            : false,
          enabled: true,
          disabled: valueItem.disabled || false
        }));
      setComboBoxItems(items);
    }
  }, [value[0], value[6], modalData, create]);

  const selectedOptions = useMemo(() => {
    return comboBoxItems
      .filter(item => item.selected)
      .map(item => item.id);
  }, [comboBoxItems]);

  const handleCodes = useCallback((id, updateType) => {
    setComboBoxItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return { ...item, selected: updateType === "add" };
        }
        return item;
      });
    });
  }, []);

  useEffect(() => {
    if (document.getElementById(value[1])) {
      document.getElementById(value[1]).value = selectedOptions.join(",");
    }
  }, [selectedOptions, value[1]]);

  const styles = {
    listbox:
      "list-box bg-white display-block height-15 width-card-lg overflow-y-scroll overflow-x-hidden border-top",
    combobox:
      "margin-top-1 margin-bottom-2 border-1px width-card-lg bg-white multi-select-combobox",
  };

  return (
    <div
      className="modalUserInput"
      value={selectedOptions.toString()}
      id={value[1]}
      epadataname={value[0]}
    >
      <MultiSelectCombobox
        items={comboBoxItems}
        entity={value[0]}
        searchBy="contains"
        onChangeUpdate={handleCodes}
        styling={styles}
        favicon={false}
        disabled={isEditingDisabled}
      />
    </div>
  );
};

MultiSelectComboboxWrapper.propTypes = {
  value: PropTypes.array.isRequired,
  create: PropTypes.bool,
  modalData: PropTypes.object,
  isEditingDisabled: PropTypes.bool
};

MultiSelectComboboxWrapper.defaultProps = {
  create: false,
  modalData: null,
  isEditingDisabled: false
};

export default MultiSelectComboboxWrapper;