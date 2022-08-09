import React, { useState, useMemo, useEffect } from "react";
import { getQAProtocolGas } from "../../../utils/api/qaCertificationsAPI";

const ProtocolGasDataRows = ({
  data
}) => {

  const { locationId, id } = data;

  const [protocolGasData, setProtocolGasData] = useState()
  const [loading, setLoading] = useState(false)

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

  return (
    <>
      <h1>protocol gas</h1>
      <p>locId: {locationId}, id: {id}</p>
      {loading && <p>Loading protocol gas data</p>}
      {!loading && <pre>{JSON.stringify(protocolGasData, null, 2)}</pre>}
    </>
  )
}

export default ProtocolGasDataRows
