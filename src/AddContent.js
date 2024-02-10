import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OneDriveFilesTable from './Sid';
import axios from 'axios';
import { Input } from '@mui/material';
import SelectedUsers from './selectedUsers';

export default function AddContent({clientId}) {
  const [open, setOpen] = React.useState(false);
  const [showDeleted,setShowDeleted] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [selectedRows,setSelectedRows]=useState([]);
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addColums,setAddColumns]=useState([]);
  const [rows,setRows]=useState([]);
  const [alreadySelectedUsers,setAlreadySelectedUsers]=useState([]);
  const [dialogWidth, setDialogWidth] = React.useState('md');
  const onedriveLogo = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
  <path fill="#084593" d="M24.5 8A14.5 14.5 0 1 0 24.5 37A14.5 14.5 0 1 0 24.5 8Z"></path><path fill="#0556ab" d="M16.155,15.972c-1.32-0.505-2.753-0.781-4.25-0.781C5.33,15.191,0,20.521,0,27.096 c0,2.476,0.757,4.774,2.05,6.678c0.061-0.026,16.445-6.889,26.406-10.888C22.952,19.568,17.903,16.641,16.155,15.972z"></path><path fill="#18b0ff" d="M48,29.373c0-5.317-4.31-9.627-9.627-9.627c-0.997,0-1.958,0.152-2.863,0.433 c-0.996,0.31-3.652,1.342-7.054,2.708c8.377,5.05,17.79,10.996,18.252,11.288C47.525,32.76,48,31.123,48,29.373z"></path><path fill="#2cceff" d="M46.709,34.175c-0.463-0.292-9.875-6.238-18.252-11.288C18.495,26.885,2.111,33.748,2.05,33.774 C2.467,34.388,5.627,39,11.904,39c5.03,0,16.176,0,26.354,0C43.669,39,46.148,35.146,46.709,34.175z"></path>
  </svg>;

  const columns = [
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
  }
    
];

  const rowDisabledCriteria = row => alreadySelectedUsers.includes(row.id);

  const addNewRows = newRows => setSelectedRows(newRows);


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
      axios.post(url, selectedJson, config).then( ( response ) => {
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
          const selectedIds = response.data.map((item) => item.userId);
          setAlreadySelectedUsers(selectedIds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
        setOpen(open); 
      }, [open]);

  useEffect(() => {
    if(open)
    {
    getAssociations();
    discovery();
    }
  }, [open]);

  useEffect(() => {
    const results = teams.filter((client) =>
      client.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(results);
  }, [searchTerm, teams]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('paper')} size='large' variant='contained' sx={{textTransform:'none',borderRadius:'20px'}}><b>Add Users</b></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // scroll={scroll}
        fullWidth
        maxWidth={dialogWidth}
      >
        <DialogTitle id="scroll-dialog-title">Add users</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {selectedRows.length>0 ?(<SelectedUsers data={selectedRows}/>):(undefined)}
      <Input placeholder="search" sx={{marginRight:'0px'}} onChange={(e) => setSearchTerm(e.target.value)} autoFocus/>
      </div>
        <OneDriveFilesTable data={filteredTeams} columns={columns} name={"Users From Cache"} selectableRows={true} 
      rowDisabledCriteria={rowDisabledCriteria} gettingSelectedRows={addNewRows}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  variant="outlined" sx={{textTransform:'none'}}>Cancel</Button>
          <Button onClick={handleAdd} variant="outlined" sx={{textTransform:'none'}} >Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}