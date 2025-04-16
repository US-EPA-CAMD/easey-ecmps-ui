import log from "loglevel";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadDropdowns } from "../../store/actions/dropdowns";
import { dataStatus } from "../../utils/constants/dataStatus";
import DropdownSelection from "../DropdownSelection/DropdownSelection";
import MultiSelectCombobox from "../MultiSelectCombobox/MultiSelectCombobox";
import SizedPreloader from "../SizedPreloader/SizedPreloader";

const MatsCodeSelect = ({
  className = "",
  disabled = false,
  label,
  multiple = false,
  optionsStoreName,
  setValue,
  value,
}) => {
  const dispatch = useDispatch();

  const options = useSelector(
    (state) => state.dropdowns[optionsStoreName][optionsStoreName],
  );

  const [optionsStatus, setOptionsStatus] = useState(dataStatus.IDLE);

  const optionsMapped = useMemo(() => {
    if (!multiple) return options;

    return options.map((option) => ({
      enabled: true,
      id: option.code,
      label: option.name,
      selected: value.includes(option.code),
    }));
  }, [multiple, options, value]);

  const onMultiSelectChange = (code, action) => {
    if (action === "add") {
      setValue((prev) => [...prev, code]);
    } else {
      setValue((prev) => prev.filter((item) => item !== code));
    }
  };

  const loadDropdownsData = useCallback(() => {
    return loadDropdowns(optionsStoreName, [[optionsStoreName]])(dispatch);
  }, [dispatch, optionsStoreName]);

  useEffect(() => {
    if (optionsStatus !== dataStatus.IDLE) return;
    if (options.length > 0) {
      setOptionsStatus(dataStatus.SUCCESS);
      return;
    }

    setOptionsStatus(dataStatus.PENDING);
    loadDropdownsData()
      .then(() => {
        setOptionsStatus(dataStatus.SUCCESS);
      })
      .catch((err) => {
        log.error(err);
        setOptionsStatus(dataStatus.ERROR);
      });
  }, [loadDropdownsData, options, optionsStatus]);

  return optionsStatus === dataStatus.PENDING ? (
    <div className="display-flex flex-column flex-justify-end height-full">
      <SizedPreloader size={3} className="margin-bottom-2" />
    </div>
  ) : (
    <>
      {multiple ? (
        <MultiSelectCombobox
          className={className}
          disabled={disabled}
          entity={optionsStoreName}
          iconAlignRight={3}
          items={optionsMapped}
          label={label}
          onChangeUpdate={onMultiSelectChange}
          searchBy="contains"
          styling={{
            combobox: `border-1px bg-white margin-top-1 multi-select-combobox`,
            listbox: "",
          }}
        />
      ) : (
        <DropdownSelection
          caption={label}
          className={className}
          disabled={disabled}
          extraSpace
          initialSelection={options.findIndex(
            (option) => option.code === value,
          )}
          selectionHandler={([_index, id]) => setValue(id)}
          options={optionsMapped}
          selectKey="code"
          viewKey="name"
        />
      )}
    </>
  );
};

export default MatsCodeSelect;
