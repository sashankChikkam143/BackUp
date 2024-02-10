import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Button, Dialog, DialogContent, DialogTitle, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AddTeams() {
  const navigate = useNavigate();
  const location = useLocation();
  const [columns, setColumns] = useState([]);
  const [clientId, setClientId] = useState(location.state.id);
  const [selectedRows, setSelectedRows] = useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [addColumns, setAddColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [alreadySelectedUsers, setAlreadySelectedUsers] = useState([]);

  const addassociations = async () => {
    try {
      const selectedData = teams.filter(row => selectedRows.includes(row.id));
      const selectedJson = selectedData.map(row => ({
        id: row.id,
        name: row.displayName,
        userId: row.id,
      }));
      console.log(selectedJson);
      var url = `http://localhost:8080/addassociations/clients/${clientId}`;
      let config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      axios.post(url, selectedJson, config).then((response) => {
        console.log(response.data);
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const discovery = async () => {
    try {
      var url = `http://localhost:8080/clients/${clientId}/discovery`;
      const response = await axios.get(url);
      if (response.data.length > 0) {
        const firstObject = response.data[0];
        setColumns(Object.keys(firstObject));
        setTeams(response.data);
        setFilteredTeams(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAdd = () => {
    const selectedData = teams.filter(row => selectedRows.includes(row.id));
    const selectedJson = selectedData.map(row => ({
      id: row.id,
      name: row.displayName,
      userId: row.id,
    }));
    setRows(selectedJson);
    setAddColumns(['userId', 'name']);
    setOpen(true);
  };

  const getAssociations = async () => {
    try {
      var url = `http://localhost:8080/associations/clients/${clientId}`;
      const response = await axios.get(url);
      if (response.data.length > 0) {
        setAlreadySelectedUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAssociations();
    discovery();
  }, [clientId]); // Updated dependency array

  useEffect(() => {
    // Filter clients based on search term
    const results = teams.filter((team) =>
      team.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  const getRowId = (row) => row.id;

  const getRowClassName = (params) => {
    return params.row && params.row.disabled ? 'disabled-row' : '';
  };

  return (
    <div style={{ height: 400, width: '100%', margin: '10px' }}>
      <Button variant="contained" color="primary" onClick={() => {
        navigate("/clientdetails", { state: { id: clientId } });
      }}>
        GoToClient
      </Button>
      <Box mb={5} mt={5} sx={{ display: 'flex', justifyContent: 'space-between' }} px={5}>
        <TextField
          label="Search Team"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedRows.length !== 0 && (
          <Button variant="contained" color="primary" onClick={handleAdd}>
            ADD
          </Button>
        )}
      </Box>
      <DataGrid
        rows={filteredTeams}
        columns={columns.map((column) => ({ field: column, headerName: column, flex: 1 }))}
        pageSize={5}
        checkboxSelection={true}
        onSelectionModelChange={(newRowSelectionModel) => {
          setSelectedRows(newRowSelectionModel);
        }}
        rowSelectionModel={selectedRows}
        disableRowSelectionOnClick
        getRowId={getRowId}
        getRowClassName={getRowClassName}
      />
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Selected Users</DialogTitle>
        <DialogContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Total Selected Users : {rows.length}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DataGrid
                rows={rows}
                columns={addColumns.map((column) => ({ field: column, headerName: column, flex: 1 }))}
                pageSize={5}
              />
            </AccordionDetails>
          </Accordion>
          <div style={{ width: '100%', marginTop: "10px", display: "flex", justifyContent: 'space-between' }}>
            <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
              CANCEL
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
              addassociations();
              setOpen(false);
              navigate("/clientdetails", { state: { id: clientId } });
            }}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddTeams;
