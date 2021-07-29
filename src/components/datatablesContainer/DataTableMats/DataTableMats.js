import React, { useEffect, useMemo, useState } from "react";
import { modalViewData } from "../../../additional-functions/create-modal-input-controls";
import { extractUserInput } from "../../../additional-functions/extract-user-input";
import * as fs from "../../../utils/selectors/monitoringPlanMethods";
import DataTableRender from "../../DataTableRender/DataTableRender";

import Modal from "../../Modal/Modal";
import ModalDetails from "../../ModalDetails/ModalDetails";
import  {useRetrieveDropdownApi}  from "../../../additional-functions/retrieve-dropdown-api";
import * as mpApi from "../../../utils/api/monitoringPlansApi";
/*import {
  getActiveData,
  getInactiveData,
} from "../../../additional-functions/filter-data";*/
export const DataTableMats = ({
  locationSelectValue,
  user,
  checkout,
  // inactive,
  // settingInactiveCheckBox,
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [matsMethods, setMatsMethods] = useState([]);
  const totalOptions = useRetrieveDropdownApi(
    ["parameterCode", "methodCode"],
    true
  );
  const [show, setShow] = useState(false);
  const [updateTable,setUpdateTable] = useState(false)
  useEffect(() => {

    if(updateTable || matsMethods.length <= 0 || locationSelectValue){

    mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
      setMatsMethods(res.data);
      setDataLoaded(true);
    });
    setUpdateTable(false);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationSelectValue,updateTable]);
  const [selectedMatsMethods, setSelectedMatsMethods] = useState(null);
  // *** column names for dataset (will be passed to normalizeRowObjectFormat later to generate the row object
  // *** in the format expected by the modal / tabs plugins)
  const columnNames = [
    "Parameter",
    "Methodology",
    "Begin Date and Time",
    "End Date and Time",
  ];

  const data = useMemo(() => {
    if (matsMethods.length > 0) {
      /*const activeOnly = getActiveData(matsMethods);
      const inactiveOnly = getInactiveData(matsMethods);*/

      // // only active data >  disable checkbox and unchecks it
      // if (activeOnly.length === matsMethods.length) {
      //   // uncheck it and disable checkbox
      //   //function parameters ( check flag, disable flag )
      //   settingInactiveCheckBox(false, true);
      //   return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      // }

      // // only inactive data > disables checkbox and checks it
      // if (inactiveOnly.length === matsMethods.length) {
      //   //check it and disable checkbox
      //   settingInactiveCheckBox(true, true);
      //   return fs.getMonitoringPlansMatsMethodsTableRecords(matsMethods);
      // }
      // resets checkbox
      // settingInactiveCheckBox(inactive[0], false);
      return fs.getMonitoringPlansMatsMethodsTableRecords(
        // !inactive[0] ?
        //  getActiveData(matsMethods) :
        matsMethods
      );
    }
    return [];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matsMethods]);
  const testing = () => {
    openMatsModal(false,false,true);
    saveMethods();
  
   }
  
   const testing2= () =>{
    openMatsModal({col5:"CAMD-BAC9D84563F24FE08057AF5643C8602C"},false,false);
  
   }
  const saveMethods = () => {
    const payload = {
      monLocId: locationSelectValue,
      id: null,
      matsMethodCode: null,
      matsMethodParameterCode: null,
      beginDate: null,
      beginHour: 0,
      endDate: null,
      endHour: 0,
    };

    const userInput = extractUserInput(payload, ".modalUserInput");
    console.log(userInput, "user");
    mpApi
      .saveMonitoringMats(userInput)
      .then((result) => {
        console.log(result);
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
        setShow(false);
      });
      mpApi.getMonitoringMatsMethods(locationSelectValue).then((res) => {
        console.log('testing save',res.data);
       
      });
      setUpdateTable(true);
  };
  const [createNewMats, setCreateNewMats] = useState(false);
  const closeModalHandler = () => setShow(false);
  const [selectedModalData, setSelectedModalData] = useState(null);
  const openMatsModal = (row, bool, create) => {
    let mats = null;
    setCreateNewMats(create);
    if (matsMethods.length > 0 && !create) {
      mats = matsMethods.filter((element) => element.id === row.col5)[0];
      setSelectedMatsMethods(mats);
    }
    setSelectedModalData(
      modalViewData(
        mats,
        {
          matsMethodParameterCode: ["Parameter", "dropdown", "required"],
          matsMethodCode: ["Methodology", "dropdown", "required"],
        },
        {
          beginDate: ["Start Date", "date", "required"],
          beginHour: ["Start Time", "time", "required"],
          endDate: ["End Date", "date", ""],
          endHour: ["End Time", "time", ""],
        },
        create,
        totalOptions
      )
    );
    setShow(true);
  };

  return (
    <div className="methodTable">
      <div className={`usa-overlay ${show ? "is-visible" : ""}`} />

      <input role="button" type="hidden" id="testingBtn" onClick ={()=> testing()}/>
      <input role="button" type="hidden" id="testingBtn2" onClick ={()=> testing2()}/>
      <DataTableRender
        columnNames={columnNames}
        data={data}
        dataLoaded={dataLoaded}
        // actionsBtn={"View"}
        checkout={checkout}
        user={user}
        openHandler={openMatsModal}
        actionsBtn={"View"}
        addBtn={openMatsModal}
        addBtnName={"Create Mats"}
      />

      {show ? (
        <Modal
          show={show}
          close={closeModalHandler}
          save={saveMethods}
          showCancel={!(user && checkout)}
          showSave={user && checkout}
          title={
            createNewMats ? "Create Mats" : "Component: Monitoring Mats Methods"
          }
          createNew={createNewMats ? "Create Mats" : `Save and Close`}
          children={
            <div>
              <ModalDetails
                modalData={selectedMatsMethods}
                data={selectedModalData}
                cols={2}
                title={"Component: Monitoring Mats Methods"}
                viewOnly={!(user && checkout)}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default DataTableMats;
