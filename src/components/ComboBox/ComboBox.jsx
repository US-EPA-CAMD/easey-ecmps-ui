import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classnames from 'classnames'

import { ActionTypes, Action, State, useComboBox } from './useComboBox'

/*  As per USWDS spec, ComboBox includes a HTML <select> with options AND a separate <input> and dropdown <ul> with items.
    The select is usa-sr-only and is always hidden via CSS. The input and dropdown list are the elements used for interaction.

    There is the ability to pass in custom props directly to the select and input.
    This should be using sparingly and not with existing Combobox props such as disabled, onChange, defaultValue. 
*/

const DEFAULT_FILTER = '.*{{query}}.*'

// type ComboBoxProps = {
//   id: string
//   name: string
//   className?: string
//   options: ComboBoxOption[]
//   defaultValue?: string
//   disabled?: boolean
//   onChange: (val?: string) => void
//   assistiveHint?: string
//   noResults?: string
//   inputProps?: JSX.IntrinsicElements['input']
//   selectProps?: JSX.IntrinsicElements['select']
//   ulProps?: JSX.IntrinsicElements['ul']
//   customFilter?: CustomizableFilter
//   disableFiltering?: boolean
// }

export const FocusMode = {
  None: "None",
  Input: "Input",
  Item: "Item"
}

const Direction = {
  Previous: -1,
  Next: 1,
}

const Input = ({
  focused,
  ...inputProps
}) => {
  const inputRef = useRef(null)
  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus()
    }
  })

  return (
    <input
      type="text"
      {...inputProps}
      className="usa-combo-box__input"
      data-testid="combo-box-input"
      autoCapitalize="off"
      autoComplete="off"
      ref={inputRef}
    />
  )
}

const ComboBoxForwardRef = (
  {
    id,
    name,
    className,
    options,
    defaultValue,
    disabled,
    onChange,
    assistiveHint,
    noResults,
    selectProps,
    inputProps,
    ulProps,
    customFilter,
    disableFiltering = false,
  },
  ref
) => {

  const isDisabled = !!disabled

  let defaultOption
  if (defaultValue) {
    defaultOption = options.find((opt) => {
      return opt.value === defaultValue
    })
  }

  const filter = customFilter
    ? customFilter
    : { filter: DEFAULT_FILTER }

  const initialState = {
    isOpen: false,
    selectedOption: defaultOption ? defaultOption : undefined,
    focusedOption: undefined,
    focusMode: FocusMode.None,
    filteredOptions: options,
    inputValue: defaultOption ? defaultOption.label : '',
    statusText: '',
  }

  const [state, dispatch] = useComboBox(
    initialState,
    options,
    disableFiltering,
    filter
  )

  const containerRef = useRef(null)
  const listRef = useRef(null)
  const focusedItemRef = useRef(null)

  useEffect(() => {
    dispatch({ type: ActionTypes.SET_OPTIONS, value: options })
  }, [options]);

  useEffect(() => {
    onChange && onChange(state.selectedOption?.value || undefined)
  }, [state.selectedOption])

  useEffect(() => {
    if (
      state.focusMode === FocusMode.Item &&
      state.focusedOption &&
      focusedItemRef.current
    ) {
      focusedItemRef.current.focus()
    }
  }, [state.focusMode, state.focusedOption])

  // When opened, the list should scroll to the closest match
  useEffect(() => {
    if (
      state.isOpen &&
      state.focusedOption &&
      focusedItemRef.current &&
      listRef.current &&
      state.focusMode === FocusMode.Input
    ) {
      const optionBottom =
        focusedItemRef.current.offsetTop + focusedItemRef.current.offsetHeight
      const currentBottom =
        listRef.current.scrollTop + listRef.current.offsetHeight

      if (optionBottom > currentBottom) {
        listRef.current.scrollTop = optionBottom - listRef.current.offsetHeight
      }

      if (focusedItemRef.current.offsetTop < listRef.current.scrollTop) {
        listRef.current.scrollTop = focusedItemRef.current.offsetTop
      }
    }
  }, [state.isOpen, state.focusedOption])

  // If the focused element (activeElement) is outside of the combo box,
  // make sure the focusMode is BLUR
  useEffect(() => {
    if (state.focusMode !== FocusMode.None) {
      if (!containerRef.current?.contains(window.document.activeElement)) {
        dispatch({
          type: ActionTypes.BLUR,
        })
      }
    }
  }, [state.focusMode])

  useImperativeHandle(
    ref,
    () => ({
      focus: () => dispatch({ type: ActionTypes.FOCUS_INPUT }),
      clearSelection: () =>
        dispatch({ type: ActionTypes.CLEAR_SELECTION }),
    }),
    []
  )

  const handleInputKeyDown = (event) => {
    if (event.key === 'Escape') {
      dispatch({ type: ActionTypes.CLOSE_LIST })
    } else if (event.key === 'ArrowDown' || event.key == 'Down') {
      event.preventDefault()
      dispatch({
        type: ActionTypes.FOCUS_OPTION,
        option:
          state.selectedOption ||
          state.focusedOption ||
          state.filteredOptions[0],
      })
    } else if (event.key === 'Tab') {
      // Clear button is not visible in this case so manually handle focus
      if (state.isOpen && !state.selectedOption) {
        // If there are filtered options, prevent default
        // If there are "No Results Found", tab over to prevent a keyboard trap
        const optionToFocus = disableFiltering
          ? state.focusedOption
          : state.selectedOption || state.focusedOption
        if (optionToFocus) {
          event.preventDefault()
          dispatch({
            type: ActionTypes.FOCUS_OPTION,
            option: optionToFocus,
          })
        } else {
          dispatch({
            type: ActionTypes.BLUR,
          })
        }
      }

      if (!state.isOpen && state.selectedOption) {
        dispatch({
          type: ActionTypes.BLUR,
        })
      }
    } else if (event.key === 'Enter') {
      if (state.isOpen) {
        event.preventDefault()
        const exactMatch = state.filteredOptions.find(
          (option) =>
            option.label.toLowerCase() === state.inputValue.toLowerCase()
        )
        if (exactMatch) {
          dispatch({
            type: ActionTypes.SELECT_OPTION,
            option: exactMatch,
          })
        } else {
          if (state.selectedOption) {
            dispatch({
              type: ActionTypes.CLOSE_LIST,
            })
          } else {
            dispatch({ type: ActionTypes.CLEAR })
          }
        }
      }
    }
  }

  const handleInputBlur = (event) => {
    const { relatedTarget: newTarget } = event
    const newTargetIsOutside =
      !newTarget ||
      (newTarget instanceof Node && !containerRef.current?.contains(newTarget))

    if (newTargetIsOutside && state.focusMode !== FocusMode.None) {
      dispatch({ type: ActionTypes.BLUR })
    }
  }

  const handleClearKeyDown = (event) => {
    if (event.key === 'Tab' && state.isOpen && state.selectedOption) {
      event.preventDefault()
      dispatch({
        type: ActionTypes.FOCUS_OPTION,
        option: state.selectedOption,
      })
    }
  }

  const focusSibling = (
    dispatch,
    state,
    change
  ) => {
    const currentIndex = state.focusedOption
      ? state.filteredOptions.indexOf(state.focusedOption)
      : -1
    const firstOption = state.filteredOptions[0]
    const lastOption = state.filteredOptions[state.filteredOptions.length - 1]

    if (currentIndex === -1) {
      dispatch({ type: ActionTypes.FOCUS_OPTION, option: firstOption })
    } else {
      const newIndex = currentIndex + change
      if (newIndex < 0) {
        dispatch({ type: ActionTypes.CLOSE_LIST })
      } else if (newIndex >= state.filteredOptions.length) {
        dispatch({ type: ActionTypes.FOCUS_OPTION, option: lastOption })
      } else {
        // eslint-disable-next-line 
        const newOption = state.filteredOptions[newIndex]
        dispatch({ type: ActionTypes.FOCUS_OPTION, option: newOption })
      }
    }
  }

  const handleListItemBlur = (event) => {
    const { relatedTarget: newTarget } = event

    if (
      !newTarget ||
      (newTarget instanceof Node && !containerRef.current?.contains(newTarget))
    ) {
      dispatch({ type: ActionTypes.BLUR })
    }
  }

  const handleListItemKeyDown = (event) => {
    if (event.key === 'Escape') {
      dispatch({ type: ActionTypes.CLOSE_LIST })
    } else if (event.key === 'Tab' || event.key === 'Enter') {
      event.preventDefault()
      if (state.focusedOption) {
        dispatch({
          type: ActionTypes.SELECT_OPTION,
          option: state.focusedOption,
        })
      }
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      event.preventDefault()
      focusSibling(dispatch, state, Direction.Next)
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.preventDefault()
      focusSibling(dispatch, state, Direction.Previous)
    }
  }

  const isPristine =
    state.selectedOption && state.selectedOption.label === state.inputValue

  const containerClasses = classnames('usa-combo-box', className, {
    'usa-combo-box--pristine': isPristine,
  })

  const listID = `${id}--list`
  const assistiveHintID = `${id}--assistiveHint`

  const focusedItemIndex = state.focusedOption
    ? state.filteredOptions.findIndex((i) => i === state.focusedOption)
    : -1
  const focusedItemId =
    focusedItemIndex > -1 && `${listID}--option-${focusedItemIndex}`

  return (
    <div
      data-testid="combo-box"
      data-enhanced="true"
      className={containerClasses}
      ref={containerRef}>
      <select
        {...selectProps}
        className="usa-select usa-sr-only usa-combo-box__select"
        name={name}
        aria-hidden
        tabIndex={-1}
        defaultValue={state.selectedOption?.value}
        data-testid="combo-box-select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Input
        {...inputProps}
        role="combobox"
        onChange={(e) => {
          if (inputProps?.onChange) {
            // Allow a custom input onChange handler
            inputProps?.onChange(e)
          }

          dispatch({ type: ActionTypes.UPDATE_FILTER, value: e.target.value })
        }}
        onClick={() => dispatch({ type: ActionTypes.OPEN_LIST })}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        value={state.inputValue}
        focused={state.focusMode === FocusMode.Input}
        aria-owns={listID}
        aria-controls={listID}
        aria-autocomplete="list"
        aria-describedby={assistiveHintID}
        aria-expanded={state.isOpen}
        aria-activedescendant={(state.isOpen && focusedItemId) || ''}
        id={id}
        disabled={isDisabled}
      />
      <span className="usa-combo-box__clear-input__wrapper" tabIndex={-1}>
        <button
          type="button"
          className="usa-combo-box__clear-input"
          aria-label="Clear the select contents"
          onClick={() => dispatch({ type: ActionTypes.CLEAR })}
          data-testid="combo-box-clear-button"
          onKeyDown={handleClearKeyDown}
          hidden={!isPristine || isDisabled}
          disabled={isDisabled}>
          &nbsp;
        </button>
      </span>
      <span className="usa-combo-box__input-button-separator">&nbsp;</span>
      <span className="usa-combo-box__toggle-list__wrapper" tabIndex={-1}>
        <button
          data-testid="combo-box-toggle"
          type="button"
          className="usa-combo-box__toggle-list"
          tabIndex={-1}
          aria-label="Toggle the dropdown list"
          onClick={() =>
            dispatch({
              type: state.isOpen
                ? ActionTypes.CLOSE_LIST
                : ActionTypes.OPEN_LIST,
            })
          }
          disabled={isDisabled}>
          &nbsp;
        </button>
      </span>
      <ul
        {...ulProps}
        data-testid="combo-box-option-list"
        tabIndex={-1}
        id={listID}
        className="usa-combo-box__list"
        role="listbox"
        ref={listRef}
        hidden={!state.isOpen}>
        {state.filteredOptions.map((option, index) => {
          const focused = option === state.focusedOption
          const selected = option === state.selectedOption
          const itemClasses = classnames('usa-combo-box__list-option', {
            'usa-combo-box__list-option--focused': focused,
            'usa-combo-box__list-option--selected': selected,
          })

          return (
            <li
              ref={focused ? focusedItemRef : null}
              value={option.value}
              key={option.value}
              className={itemClasses}
              tabIndex={focused ? 0 : -1}
              role="option"
              aria-selected={selected}
              aria-setsize={state.filteredOptions.length}
              aria-posinset={index + 1}
              id={listID + `--option-${index}`}
              onKeyDown={handleListItemKeyDown}
              onBlur={handleListItemBlur}
              data-testid={`combo-box-option-${option.value}`}
              data-value={option.value}
              onMouseEnter={() =>
                dispatch({ type: ActionTypes.FOCUS_OPTION, option: option })
              }
              onClick={() => {
                dispatch({ type: ActionTypes.SELECT_OPTION, option: option })
              }}>
              {option.label}
            </li>
          )
        })}
        {state.filteredOptions.length === 0 ? (
          <li className="usa-combo-box__list-option--no-results">
            {noResults || 'No results found'}
          </li>
        ) : null}
      </ul>

      <div className="usa-combo-box__status usa-sr-only" role="status">
        {state.statusText}
      </div>
      <span
        id={assistiveHintID}
        className="usa-sr-only"
        data-testid="combo-box-assistive-hint">
        {assistiveHint ||
          `When autocomplete results are available use up and down arrows to review
           and enter to select. Touch device users, explore by touch or with swipe
           gestures.`}
      </span>
    </div>
  )
}

export const ComboBox = forwardRef(ComboBoxForwardRef)

export default ComboBox
