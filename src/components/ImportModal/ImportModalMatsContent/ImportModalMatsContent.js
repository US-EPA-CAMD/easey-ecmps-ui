import React, { useState, useRef } from "react";
import { FormGroup, Label } from "@trussworks/react-uswds";

import DropdownSelection from "../../DropdownSelection/DropdownSelection";
import { FileInput } from "../../FileInput/FileInput";
import { getQATestSummary, getQATestSummaryOfficial } from "../../../utils/api/qaCertificationsAPI";

const initialStateLocations = {
  id: "select-0",
  name: "--- Select a value ---",
};
const initialStateTypes = { key: "select-1", name: "--- Select a value ---" };
const initialStateNums = { key: "select-2", name: "--- Select a value ---" };

const ImportModalMatsContent = ({
  setImportedFile,
  importedFile,
  selectedTestNumberRef,
  testCodeLegend,
  locations,
  setDisablePortBtn,
}) => {
  const testSummaryRecords = useRef([]);

  const [locationSelection, setLocationSelection] = useState(0);
  const [testGroupSelection, setTestGroupSelection] = useState(0);
  const [testNumberSelection, setTestNumberSelection] = useState(0);

  const [locationsDropdown] = useState([initialStateLocations, ...locations]);
  const [testTypes, setTestTypes] = useState([initialStateTypes]);
  const [testNums, setTestNums] = useState([initialStateNums]);

  const updateLocationSelection = async (value) => {
    setDisablePortBtn(true);
    setLocationSelection(value[0]);

    setTestTypes([initialStateTypes]);
    setTestGroupSelection(0); //On new selection reset the previous selections

    setTestNums([initialStateNums]);
    setTestNumberSelection(0);

    if (value[0] !== 0) {
      try {
        const workspaceResp = await getQATestSummary(value[1], null, null, null, true);
        const officialResp = await getQATestSummaryOfficial(value[1]);

        testSummaryRecords.current = [...workspaceResp.data, ...officialResp.data]; //Store these for later us when filtering by test type as well
        
        const groupCodes = Array.from(
          new Set(testSummaryRecords.current.map((ts) => ts.testTypeCode))
        ); //Extract group codes and remove duplicates

        const testTypeOptions = [initialStateTypes];

        groupCodes.forEach((cd) => {
          testTypeOptions.push({
            key: cd,
            name: testCodeLegend.find((f) => f.testTypeCode === cd)
              .testTypeDescription,
          });
        });

        setTestTypes(testTypeOptions);
      } catch (e) {
        console.log("error fetching test summary records", e);
      }
    }
  };

  const updateTypeSelection = async (value) => {
    setDisablePortBtn(true);
    setTestGroupSelection(value[0]); //On new selection reset the previous selections

    setTestNums([initialStateNums]);
    setTestNumberSelection(0);

    if (value[0] !== 0) {
      const testSummaryFiltered = testSummaryRecords.current.filter(
        (f) => f.testTypeCode === value[1]
      );
      
      const uniqueTestNumbers = Array.from(
        new Set(testSummaryFiltered.map(f => f.testNumber))
      )
      const options = uniqueTestNumbers.map((testNumber) => ({
        key: testNumber,
        name: testNumber,
      }));

      setTestNums([initialStateNums, ...options]);
    }
  };

  const updateNumSelection = async (value) => {
    setTestNumberSelection(value[0]); //On new selection reset the previous selections

    selectedTestNumberRef.current = {
      location: locationsDropdown[locationSelection].name,
      testTypeGroup: testTypes[testGroupSelection].key,
      testNumber: testNums[value[0]].key,
    };

    if (value[0] !== 0 && importedFile.length !== 0) {
      setDisablePortBtn(false);
    } else {
      setDisablePortBtn(true);
    }
  };

  const onChangeHandler = (e) => {
    setImportedFile(e.target.files);

    if (testNumberSelection !== 0 && e.target.files.length > 0) {
      setDisablePortBtn(false);
    } else {
      setDisablePortBtn(true);
    }
  };

  return (
    <div>
      <div className="grid-row">
        <div className="grid-col-4">
          <DropdownSelection
            caption={"Location"}
            options={locationsDropdown}
            viewKey="name"
            selectKey="id"
            initialSelection={locationSelection}
            selectionHandler={updateLocationSelection}
          />
        </div>
        <div className="grid-col-8">
          <DropdownSelection
            caption={"Test Type"}
            options={testTypes}
            viewKey={"name"}
            selectKey={"key"}
            initialSelection={testGroupSelection}
            selectionHandler={updateTypeSelection}
          />
        </div>
        <div className="grid-col-4">
          <DropdownSelection
            caption={"Test Number"}
            options={testNums}
            viewKey={"name"}
            selectKey={"key"}
            initialSelection={testNumberSelection}
            selectionHandler={updateNumSelection}
          />
        </div>
      </div>
      <FormGroup>
        <Label htmlFor="file-input-multiple">File Upload</Label>
        <FileInput
          id="file-input-multiple"
          name="file-input-multiple"
          multiple
          onChange={onChangeHandler}
        />
      </FormGroup>
    </div>
  );
};

export default ImportModalMatsContent;
