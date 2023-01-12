import React from 'react';
import QACertEventDatatable from '../QACertEventDataTableContainer/QACertEventDatatable/QACertEventDatatable';
import QACertEventHeaderInfo from '../QACertEventHeaderInfo/QACertEventHeaderInfo';

export const QACertEventTabRender = ({
  title,
  user,
  locations,
  selectedConfig,
  setSectionSelect,
  setLocationSelect,
  setSelectedTestCode,
  selectedTestCode,
  sectionSelect,
  locationSelect,
  orisCode,
  configID,
  setCheckout,
  checkoutState,
}) => {
  return (
    <div className=" padding-top-0">
      <div className="grid-row">
        <QACertEventHeaderInfo
          facility={title}
          selectedConfig={selectedConfig}
          orisCode={orisCode}
          sectionSelect={sectionSelect}
          setSectionSelect={setSectionSelect}
          setLocationSelect={setLocationSelect}
          locationSelect={locationSelect}
          locations={locations}
          user={user}
          configID={configID}
          setSelectedTestCode={setSelectedTestCode}
          setCheckout={setCheckout}
          checkoutState={checkoutState}
        />
      </div>
      <hr />
      {
        <QACertEventDatatable
          locationSelectValue={locationSelect ? locationSelect[1] : 0}
          user={user}
          sectionSelect={sectionSelect}
          selectedLocation={{
            name: locations[locationSelect[0]]['name'],
            stackPipeId: locations[locationSelect[0]]['stackPipeId'],
            unitId: locations[locationSelect[0]]['unitId'],
          }}
          locations={locations}
          selectedTestCode={selectedTestCode}
          isCheckedOut={checkoutState}
        />
      }
    </div>
  );
};

export default QACertEventTabRender;
