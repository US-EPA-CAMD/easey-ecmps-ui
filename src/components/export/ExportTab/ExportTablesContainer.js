import React from 'react';

const ExportTablesContainer = props => {
  const { selectionData } = props

  const content = JSON.stringify(selectionData, null, 2)

  return <pre>{content}</pre>
}

export default ExportTablesContainer
