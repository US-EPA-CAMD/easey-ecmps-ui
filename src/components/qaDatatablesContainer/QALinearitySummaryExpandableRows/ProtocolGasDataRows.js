
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";

import { getQAProtocolGas } from "../../../utils/api/qaCertificationsAPI";
import QADataTableRender from "../../QADataTableRender/QADataTableRender";
import { Preloader } from "@us-epa-camd/easey-design-system";

const dummyData = [
  {
    "id": "id1",
    "testSumId": "testSumId1",
    "userId": "userId1",
    "addDate": "addDate1",
    "updateDate": "updateDate1",
    "gasLevelCode": "xyzSortedSecond",
    "gasTypeCode": "gasTypeCode1",
    "vendorID": "vendorID1",
    "cylinderID": "cylinderID1",
    "expirationDate": "2022-08-10T16:24:18.663Z"
  },
  {
    "id": "id2",
    "testSumId": "testSumId2",
    "userId": "userId2",
    "addDate": "addDate2",
    "updateDate": "updateDate2",
    "gasLevelCode": "abcSortedFirst",
    "gasTypeCode": "gasTypeCode2",
    "vendorID": "vendorID2",
    "cylinderID": "cylinderID2",
    "expirationDate": "2022-08-10T16:24:18.663Z"
  }
]

const tableLabel = 'Protocol Gas'

const ProtocolGasDataRows = ({
  user,
  data
}) => {

  const { locationId, id } = data;

  const [protocolGasData, setProtocolGasData] = useState()
  const [loading, setLoading] = useState(false)

  const columns = [
    'Gas Level Code',
    'Gas Type Code',
    'Cylinder ID',
    'Vendor ID',
    'Expiration Date',
  ];

  useEffect(() => {
    const fetchProtocolGas = async () => {
      setLoading(true)
      const resp = await getQAProtocolGas(locationId, id)
      // const resp = { data: dummyData }
      setLoading(false)
      console.log('resp', resp);

      setProtocolGasData(resp.data)
    }
    fetchProtocolGas()
  }, [id, locationId])

  const mappedDataToRows = useMemo(() => {
    return mapProtocolGasDataToRows(protocolGasData)
  }, [protocolGasData])

  return (
    <>
      {loading && <Preloader />}
      {!loading &&
        <div className="padding-3">
          <QADataTableRender
            columnNames={columns}
            columnWidth={15}
            data={mappedDataToRows}
            actionColumnName={
              user ?
                <>
                  <span className="padding-right-2">
                    {tableLabel}
                  </span>
                  <Button
                    epa-testid="btnOpen"
                    className="text-white"
                    onClick={() => console.log('add protocol gas clicked')}
                  >
                    Add
                  </Button>
                </>
                : tableLabel
            }
            actionsBtn={"View"}
            user={user}
          />
        </div>
      }
    </>
  )
}

export default ProtocolGasDataRows

const mapProtocolGasDataToRows = (data = []) => {
  const records = [];
  for (const cur of data) {
    const row = {
      id: cur.id,
      col1: cur.gasLevelCode,
      col2: cur.gasTypeCode,
      col3: cur.cylinderID,
      col4: cur.vendorID,
      col5: cur.expirationDate
    }
    records.push(row)
  }
  // sort rows alphabetically by col1 (gas level code)
  records.sort((row1, row2) => row1.col1.localeCompare(row2.col1))
  return records;
}