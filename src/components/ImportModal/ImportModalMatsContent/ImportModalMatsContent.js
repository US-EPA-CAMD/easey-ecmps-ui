import React, { useState, useEffect } from "react";
import DropdownSelection from "../../DropdownSelection/DropdownSelection";
import { FormGroup, Label } from "@trussworks/react-uswds";
import { getQATestSummary } from "../../../utils/api/qaCertificationsAPI";
import { FileInput } from "../../FileInput/FileInput";

const initialSelectOption = { key: "select", name: "--- Select a value ---" }

const ImportModalMatsContent = ({
  locationId
}) => {
  const [selection, setSelection] = useState(0);
  const [testNums, setTestNums] = useState([initialSelectOption])

  useEffect(() => {
    const fetchTestNumbers = async () => {
      try {
        const resp = await getQATestSummary(locationId)

        const testNums = resp.data.map(testSummary => {
          const { testNumber } = testSummary
          return { key: testNumber, name: testNumber }
        })
        setTestNums([initialSelectOption, ...testNums])
      } catch (e) {
        console.log('error fetching test numbers', e)
      }
    }
    fetchTestNumbers()
  }, [locationId])

  const onChangeHandler = (e) => {
    console.log(e.target.files);
  };

  return (
    <div>
      <DropdownSelection
        caption={"Test Number"}
        options={testNums}
        viewKey={"name"}
        selectKey={"key"}
        initialSelection={selection}
        selectionHandler={(value) => setSelection(value[0])}
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
