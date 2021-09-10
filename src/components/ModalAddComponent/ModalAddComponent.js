import React from "react";

import { DropdownSelection } from "../DropdownSelection/DropdownSelection";
const ModalAddComponent = ({
    unlinkedComponents,selectionHandler
}) => {

  return (
    <div>
      <div className="grid-row">
        <DropdownSelection
          caption="Locations"
          //   orisCode={orisCode}
          //   options={locations}
          viewKey="name"
          selectKey="id"
          //   initialSelection={locationSelect[0]}
          //   selectionHandler={setLocationSelect}
        />
      </div>
    </div>
  );
};

export default ModalAddComponent;
