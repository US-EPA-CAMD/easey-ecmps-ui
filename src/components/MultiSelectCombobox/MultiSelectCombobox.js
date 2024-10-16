import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Label } from "@trussworks/react-uswds";
import PillButton from "../PillButton/PillButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./MultiSelectCombobox.scss";
import { debounce } from "lodash";

const getComboboxEnabledItems = (arr) => {
  return arr.filter((e) => e.enabled);
};

export const DEBOUNCE_MILLISECONDS = 200;

const MultiSelectCombobox = ({
  items,
  label,
  entity,
  onChangeUpdate,
  searchBy,
  hideInput,
  styling,
  autoFocus,
  iconAlignRight = 1,
  favicon = true,
  disabled = false,
}) => {
  const [filter, setFilter] = useState("");
  const [_items, _setItems] = useState(items.filter((e) => e.enabled));
  const [data, setData] = useState(
    JSON.parse(JSON.stringify(getComboboxEnabledItems(items)))
  );
  const [showListBox, setShowListBox] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const selectedItemsRef = useRef(selectedItems);
  const inputRef = useRef(null);

  useEffect(() => {
    const enabledItems = getComboboxEnabledItems(items);
    setData([...enabledItems]);
    _setItems(enabledItems);
  }, [items]);

  const handleMultiSelectClick = (e) => {
    const multiSelectComboboxDiv = document.getElementById(
      `multi-select-combobox-${entity}`
    );
    if (multiSelectComboboxDiv && !multiSelectComboboxDiv.contains(e.target)) {
      setShowListBox(false);
    }
  };

  const onSearchHandler = (value) => {
    const lowercasedFilter = value.toLowerCase();
    let filteredData = _items;
    if (value.length > 0) {
      if (searchBy === "contains") {
        filteredData = _items.filter((item) =>
          item.label?.toString().toLowerCase().includes(lowercasedFilter)
        );
      } else if (searchBy === "beginsWith") {
        filteredData = _items.filter((item) =>
          item.label?.toString().toLowerCase().startsWith(lowercasedFilter)
        );
      }
    }

    setData([...filteredData]);
    setShowListBox(true);
  };

  // using useMemo here instead of useCallback will make this faster since useCallback will cause lodash's debounce()
  // to run every time MultiSelectComboBox rerenders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnSearchHandler = useMemo(
    () => debounce(onSearchHandler, DEBOUNCE_MILLISECONDS),
    [_items]
  );

  const updateListDataOnChange = useCallback(
    (id, update) => {
      const _itemsCopy = [..._items];
      const index = _itemsCopy.findIndex(
        (d) => d.id.toString() === id.toString()
      );
      if (index > -1) {
        _itemsCopy[index].selected = update === "add";
      }
      _setItems([..._itemsCopy]);
      setData([..._itemsCopy]);
    },
    [_items]
  );

  const onRemoveHanlder = useCallback(
    (id) => {
      const itemsCopy = [...selectedItemsRef.current];
      const index = itemsCopy.findIndex(
        (i) => i.id.toString() === id.toString()
      );
      if (index > -1) {
        itemsCopy.splice(index, 1);
        selectedItemsRef.current = itemsCopy;
        setSelectedItems(itemsCopy);
        updateListDataOnChange(id, "remove");
        onChangeUpdate(id, "remove");
        inputRef.current.focus();
      }
    },
    [selectedItemsRef, onChangeUpdate, updateListDataOnChange]
  );

  const optionClickHandler = (e) => {
    if (e.target.getAttribute("data-id") === null) {
      return;
    }
    const id = e.target.getAttribute("data-id");
    const optionLabel = e.target.getAttribute("data-label");
    if (!selectedItems.find((s) => s.id.toString() === id.toString())) {
      const _selectedItems = [
        ...selectedItems,
        {
          id: id,
          component: (
            <PillButton
              key={id}
              index={id}
              label={optionLabel}
              onRemove={onRemoveHanlder}
            />
          ),
        },
      ];
      selectedItemsRef.current = _selectedItems;
      onSearchHandler("");
      setSelectedItems([..._selectedItems]);
      updateListDataOnChange(id, "add");
      onChangeUpdate(id, "add");
    }
  };

  const populateSelectedItems = useCallback(() => {
    const selection = items.filter((i) => i.selected);
    const _selectedItems = [];
    for (const s of selection) {
      _selectedItems.push({
        id: s.id,
        component: (
          <PillButton
            key={s.id}
            index={s.id}
            label={s.label}
            onRemove={onRemoveHanlder}
            data-testid={`${entity}-${s.id}-selected-pill`}
          />
        ),
      });
    }
    selectedItemsRef.current = _selectedItems;
    setSelectedItems(_selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, onRemoveHanlder]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!showListBox) {
        setShowListBox(true);
      } else {
        optionClickHandler(event);
      }
    } else if (event.key === "Escape") {
      setShowListBox(false);
      const applyBtn = document.querySelector(".autofocus2");
      if (applyBtn) {
        applyBtn.focus();
      }
    }
  };

  useEffect(() => {
    populateSelectedItems();
  }, [populateSelectedItems]);

  useEffect(() => {
    window.addEventListener("click", handleMultiSelectClick);
    return () => {
      window.removeEventListener("click", handleMultiSelectClick);
    };
  });

  return (
    <>
      <Label id={`${entity}-label`} htmlFor={`${entity}-searchbox`}>
        {label}
      </Label>
      <div
        role="combobox"
        name={entity}
        aria-haspopup={`listbox`}
        aria-controls={`${entity}-searchbox`}
        aria-expanded={showListBox}
        aria-owns={`${entity}-listbox`}
        id={`multi-select-combobox-${entity}`}
        className={
          styling?.combobox ||
          "margin-top-1 margin-bottom-2 border-1px bg-white multi-select-combobox"
        }
      >
        <div className="margin-x-05 margin-top-05 display-block maxh-card overflow-y-scroll">
          {selectedItems.length > 0 && selectedItems.map((i) => i.component)}
        </div>
        {hideInput ? null : (
          <>
            <input
              disabled={disabled}
              autoFocus={autoFocus}
              id={`${entity}-searchbox`}
              type="text"
              aria-labelledby={`${entity}-label`}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls={`${entity}-listbox`}
              aria-activedescendant={`${entity}-listbox`}
              className="search position-static bg-white border-0 width-full height-4 padding-x-1"
              data-testid={`${entity}-input-search`}
              value={filter}
              ref={inputRef}
              onChange={(e) => {
                setFilter(e.target.value);
                debouncedOnSearchHandler(e.target.value);
              }}
              onClick={() => setShowListBox(true)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            {favicon ? (
              <FontAwesomeIcon
                icon={faCaretDown}
                className={`pin-right margin-right-${iconAlignRight} padding-top-05`}
                onClick={() => !disabled && setShowListBox(true)}
              />
            ) : (
              <></>
            )}
          </>
        )}
        {showListBox || hideInput ? (
          <ul
            aria-multiselectable="true"
            role="listbox"
            aria-labelledby={`${entity}-label`}
            id={`${entity}-listbox`}
            tabIndex="-1"
            className={
              styling?.listbox ||
              "list-box bg-white display-block height-15 width-full overflow-y-scroll overflow-x-hidden border-top"
            }
          >
            {data.length > 0 ? (
              data.map((item, i) => (
                <li
                  key={i}
                  role="option"
                  aria-selected={item.selected}
                  data-id={item.id}
                  tabIndex="0"
                  data-label={item.label}
                  data-testid={`${entity}-multi-select-option-${i}`}
                  className={
                    (item.selected
                      ? "item selected padding-y-1 padding-x-2 border-top-0 display-flex flex-row flex-justify"
                      : "item padding-y-1 padding-x-2 border-top-0 display-flex flex-row flex-justify") +
                    " " +
                    (item.disabled ? "disabled " : "")
                  }
                  onClick={optionClickHandler}
                  onKeyDown={(e) => handleKeyDown(e)}
                >
                  <span
                    data-id={item.id}
                    data-label={item.label}
                    className="option-label width-mobile"
                  >
                    {item.label}
                  </span>
                  {item.selected ? (
                    <FontAwesomeIcon icon={faCheck} color="#005ea2" />
                  ) : null}
                </li>
              ))
            ) : (
              <span className="padding-x-2 padding-top-2">
                No {entity.replace("-", " ")} match your search.
              </span>
            )}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default MultiSelectCombobox;
