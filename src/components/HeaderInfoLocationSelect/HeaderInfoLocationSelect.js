import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { convertSectionToStoreName } from '../../additional-functions/workspace-section-and-store-names';
import { setLocationSelectionState } from '../../store/actions/dynamicFacilityTab';
import { DropdownSelection } from '../DropdownSelection/DropdownSelection';

const emptyOption = { id: '', name: '-- Select a value --' };

const HeaderInfoLocationSelect = ({
  className = '',
  selectedConfig,
  workspaceSection,
  allowEmpty = false,
}) => {
  const dispatch = useDispatch();
  const tabs = useSelector(
    (state) =>
      state.openedFacilityTabs[convertSectionToStoreName(workspaceSection)],
  );
  const initialized = useRef(false);

  const currentTab = tabs.find(
    (tab) => tab.selectedConfig.id === selectedConfig.id,
  );
  const locationSelection = currentTab?.location;
  const locations = selectedConfig?.monitoringLocationData ?? [];
  const locationOptions = allowEmpty ? [emptyOption, ...locations] : locations;

  const setLocationSelection = useCallback(
    (newLocationSelection) => {
      if (!currentTab) return;

      dispatch(
        setLocationSelectionState(
          newLocationSelection,
          currentTab.name,
          convertSectionToStoreName(workspaceSection),
        ),
      );
    },
    [currentTab, dispatch, workspaceSection],
  );

  useEffect(() => {
    if (initialized.current) return;

    if (allowEmpty) {
      setLocationSelection([0, emptyOption.id]);
    }
    initialized.current = true;
  }, [allowEmpty, setLocationSelection]);

  return (
    <DropdownSelection
      caption="Locations"
      className={className}
      extraSpace
      options={locationOptions}
      viewKey="name"
      selectKey="id"
      initialSelection={locationSelection?.[0] ?? null}
      selectionHandler={setLocationSelection}
    />
  );
};

export default HeaderInfoLocationSelect;
