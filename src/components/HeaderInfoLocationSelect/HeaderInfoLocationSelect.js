import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { convertSectionToStoreName } from "../../additional-functions/workspace-section-and-store-names";
import { setLocationSelectionState } from "../../store/actions/dynamicFacilityTab";
import { DropdownSelection } from "../DropdownSelection/DropdownSelection";

export const HeaderInfoLocationSelect = ({
  selectedConfig,
  workspaceSection,
}) => {
  const dispatch = useDispatch();
  const tabs = useSelector(
    (state) =>
      state.openedFacilityTabs[convertSectionToStoreName(workspaceSection)]
  );

  const currentTab = tabs.find(
    (tab) => tab.selectedConfig.id === selectedConfig.id
  );
  const locationSelection = currentTab?.location;
  const locations = selectedConfig?.monitoringLocationData ?? [];

  const setLocationSelection = (newLocationSelection) => {
    if (!currentTab) return;

    dispatch(
      setLocationSelectionState(
        newLocationSelection,
        currentTab.name,
        convertSectionToStoreName(workspaceSection)
      )
    );
  };

  return (
    <DropdownSelection
      caption="Locations"
      options={locations}
      viewKey="name"
      selectKey="id"
      initialSelection={locationSelection?.[0] ?? null}
      selectionHandler={setLocationSelection}
    />
  );
};

export default HeaderInfoLocationSelect;
