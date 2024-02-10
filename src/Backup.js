import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import axios from 'axios';

export default function Backup({selectedItems,sendJob,clientId}) {
  const [open, setOpen] = React.useState(false);
  const [backupType, setBackupType]=React.useState("incremental")

  const handleClickOpen = () => {
    //console.log(selectedItems[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setBackupType("incremental");
    setOpen(false);
  };

  const backup = async () => {
    try {
     var url = `http://localhost:8080/backup/clients/${clientId}`;
      let config = {
        headers: {
           'Content-Type': 'application/json',
        } 
   }
      //let params = JSON.stringify(selectedJson);
      axios.post(url, selectedItems, config).then( ( response ) => {
     //setJob(response.data);
        console.log(response.data);
        sendJob(response.data['id']);
     
  });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  
  const handleSubmit = () => {

    //console.log(selectedItems);
    backup();
    setBackupType("incremental");
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Backup
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Backup Options</b>
        </DialogTitle>
        <DialogContent  >
          
        <Paper elevation={24} sx={{marginTop:'10px',padding:'10px'}}>
          <Stack spacing={2}>
          <b>selected user</b>
          <Stack direction="row" spacing={1}>
        <Chip label={selectedItems[0].displayName} color="success" />
        <Chip label={selectedItems[0].id} color="success" />
      </Stack>
      </Stack>
        </Paper>
      <FormControl sx={{marginTop:'20px'}}>
      <FormLabel id="demo-radio-buttons-group-label" ><b>Backup Type</b></FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={backupType}
          onChange={(e)=>{
            setBackupType(e.target.value);
          }}
        >
          <FormControlLabel value="incremental" control={<Radio />} label="Incremental" />
          <FormControlLabel value="full" control={<Radio />} label="Full" />
        </RadioGroup>
    </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}