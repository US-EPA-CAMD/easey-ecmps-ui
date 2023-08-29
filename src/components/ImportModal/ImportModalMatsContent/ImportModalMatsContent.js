import React, { useState, useEffect } from "react";
import { FormGroup, Label } from "@trussworks/react-uswds";

import DropdownSelection from "../../DropdownSelection/DropdownSelection";
import { FileInput } from "../../FileInput/FileInput";
import { getQATestSummary, getQATestSummaryOfficial } from "../../../utils/api/qaCertificationsAPI";

const initialSelectOption = { key: "select", name: "--- Select a value ---" }

const ImportModalMatsContent = ({
  locationId,
  setImportedFile,
  selectedTestNumberRef,
}) => {
  const [selection, setSelection] = useState(0);
  const [testNums, setTestNums] = useState([initialSelectOption])

  useEffect(() => {
    const fetchTestNumbers = async () => {
      try {
        const respWorkspace = await getQATestSummary(locationId)
        const respOfficial = await getQATestSummaryOfficial(locationId)

        const allTestSummaries = [...respWorkspace.data, ...respOfficial.data]
        const testNums = allTestSummaries.map(testSummary => testSummary.testNumber)
        const testNumsSet = new Set(testNums) // remove duplicates
        const testNumsData = Array.from(testNumsSet).sort().map(testNum => ({key: testNum, name: testNum}))

        setTestNums([initialSelectOption, ...testNumsData])
      } catch (e) {
        console.log('error fetching test numbers', e)
      }
    }
    fetchTestNumbers()
  }, [locationId])

  const selectTestNumberHandler = (value) => {
    setSelection(value[0])
    selectedTestNumberRef.current = value[0]
  }

  const onChangeHandler = (e) => {
    console.log(e.target.files);
    setImportedFile(e.target.files)
  };

  return (
    <div>
      <DropdownSelection
        caption={"Test Number"}
        options={testNums}
        viewKey={"name"}
        selectKey={"key"}
        initialSelection={selection}
        selectionHandler={selectTestNumberHandler}
      />
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
  )
}

export default ImportModalMatsContent
