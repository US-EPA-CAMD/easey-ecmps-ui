
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@trussworks/react-uswds";

import { getQAProtocolGas } from "../../../utils/api/qaCertificationsAPI";
import QADataTableRender from "../../QADataTableRender/QADataTableRender";
import { Preloader } from "@us-epa-camd/easey-design-system";
import { mapProtocolGasDataToRows } from "../../../utils/selectors/QACert/ProtocolGas";

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
