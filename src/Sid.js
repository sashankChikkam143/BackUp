import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Container } from '@mui/material';

const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};

export default function OneDriveFilesTable({
  columns,
  data,
  name,
  selectableRows,
  rowDisabledCriteria,
  gettingSelectedRows,
  singleRowSelection,
}) 
{
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    setSelectedData([]);
  }, [data]); // Clear selection when data changes

  const handleRowSelected = (state) => {
    setSelectedData(state.selectedRows);
    if (gettingSelectedRows) {
      //console.log(state.selectedRows);
      gettingSelectedRows(state.selectedRows);
    }
  };

  const singleRowSelectionCriteria = (row) => {
    if (singleRowSelection) {
      return selectedData.length > 0 && selectedData[0].id !== row.id;
    }
    return false;
  };

  return (
    <div width="100%">
      <DataTable
        title={name}
        pageSize={10}
        pagination={false}
        columns={columns}
        data={data}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        selectableRowDisabled={(row) =>
          (rowDisabledCriteria && rowDisabledCriteria(row)) || singleRowSelectionCriteria(row)
        }
        selectableRows={selectableRows}
        onSelectedRowsChange={handleRowSelected}
      />
   </div>
  );
}
