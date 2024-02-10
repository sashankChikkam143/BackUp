import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Button ,DialogContent,DialogTitle} from '@mui/material';
import {useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import OneDriveFilesTable from './Sid';

function AddTeams() {
    const navigate = useNavigate();
    const location = useLocation();
    const clientId = useState(location.state.id[0]);
    const [selectedRows,setSelectedRows]=useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open,setOpen]=useState('');
  const [addColums,setAddColumns]=useState([]);
  const [rows,setRows]=useState([]);
  const [alreadySelectedUsers,setAlreadySelectedUsers]=useState([]);
  const onedriveLogo = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
  <path fill="#084593" d="M24.5 8A14.5 14.5 0 1 0 24.5 37A14.5 14.5 0 1 0 24.5 8Z"></path><path fill="#0556ab" d="M16.155,15.972c-1.32-0.505-2.753-0.781-4.25-0.781C5.33,15.191,0,20.521,0,27.096 c0,2.476,0.757,4.774,2.05,6.678c0.061-0.026,16.445-6.889,26.406-10.888C22.952,19.568,17.903,16.641,16.155,15.972z"></path><path fill="#18b0ff" d="M48,29.373c0-5.317-4.31-9.627-9.627-9.627c-0.997,0-1.958,0.152-2.863,0.433 c-0.996,0.31-3.652,1.342-7.054,2.708c8.377,5.05,17.79,10.996,18.252,11.288C47.525,32.76,48,31.123,48,29.373z"></path><path fill="#2cceff" d="M46.709,34.175c-0.463-0.292-9.875-6.238-18.252-11.288C18.495,26.885,2.111,33.748,2.05,33.774 C2.467,34.388,5.627,39,11.904,39c5.03,0,16.176,0,26.354,0C43.669,39,46.148,35.146,46.709,34.175z"></path>
  </svg>;

  const columns2 = [
    {
      cell: (row) => (
        <div>
           {onedriveLogo}
        </div>
      ),
      width: '30px',
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
        name: 'DisplayName',
        selector: row => row.displayName,
    },
    {
      name: 'UserPrincipalName',
      selector: row => row.userPrincipalName,
  },
    {
      name:'UserId',
      selector: row => row.id,

    }
    
];

  const rowDisabledCriteria = row => alreadySelectedUsers.includes(row.id);

  const addChanges =(newRows)=>{
    setSelectedRows(newRows);
  };

  const addassociations = async () => {
    try {
      const selectedData = teams.filter(row => selectedRows.includes(row.id));
    const selectedJson = selectedData.map(row => ({
      name: row.displayName,
      userId:row.id,
      clientId:clientId
    }));
    console.log(selectedJson);
     var url = `http://localhost:8080/addassociations/clients/${clientId}`;
      let config = {
        headers: {
           'Content-Type': 'application/json',
        } 
   }
      //let params = JSON.stringify(selectedJson);
      axios.post(url, selectedJson, config).then( ( response ) => {
     //setJob(response.data);
        // console.log(response.data);
     
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
        // Extract keys from the first object in the array
        // const firstObject = response.data[0];
        // setColumns(Object.keys(firstObject));

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
      id:row.id,
      name: row.displayName,
      userId:row.id,
    }));
    setRows(selectedJson);
    setAddColumns(['userId','name']);
    setOpen(true);
    }
    const getAssociations = async () => {
      try {
      var url = `http://localhost:8080/associations/clients/${clientId}`;
        const response = await axios.get(url);
        if (response.data.length > 0) {
          // Extract keys from the first object in the array
          // const columns = Object.keys(firstObject);
          const selectedIds = response.data.map((item) => item.userId);
          setAlreadySelectedUsers(selectedIds);
          //console.log(newcolumns);
    
          //columns.remove(Object.keys(firstObject));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  useEffect(() => {
    // Fetch clients data from the API
    getAssociations();
    discovery();
  }, []);

  useEffect(() => {
    // Filter clients based on search term
    const results = teams.filter((client) =>
      client.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  return (
    <div style={{ height: 400, width: '100%' ,margin:'10px'}}>
      <Button variant="contained" color="primary" onClick={()=>{
            navigate("/clientdetails",{state:{id:clientId}});
          }}>
            GoToClient
        </Button>
      <Box mb={1} mt={5} sx={{ display: 'flex',justifyContent: 'space-between' }} px={5}>
        <TextField
          label="Search Team"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          height="1px"
        />
         {selectedRows.length !== 0 && (
          <Button variant="contained" color="primary" onClick={()=>{
            handleAdd();
          }}>
            ADD
          </Button>
        )}
      </Box>
      <OneDriveFilesTable data={filteredTeams} columns={columns2} name={"Users From Cache"} selectableRows={true} 
      rowDisabledCriteria={rowDisabledCriteria} addChanges={addChanges}/>
            
      
        <Dialog
        fullScreen
        open={open}
        onClose={handleAdd}
        // TransitionComponent={Transition}
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
              columns={addColums.map((column) => ({ field: column, headerName: column, flex: 1 }))}
              pageSize={5}
            />
        </AccordionDetails>
      </Accordion>
      <div style={{width: '100%' ,marginTop:"10px",display:"flex",justifyContent: 'space-between'}}>
      <Button variant="contained" color="primary" onClick={()=>{
            setOpen(false);
          }}>
            CANCEL
          </Button>
          <Button variant="contained" color="primary" onClick={()=>{
            addassociations();
            setOpen(false);
            navigate("/clientdetails",{state:{id:clientId}});
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
