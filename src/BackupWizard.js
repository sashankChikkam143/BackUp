import React, { useState, useEffect } from 'react';
import { Box,Chip,Paper,Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import RedoIcon from '@mui/icons-material/Redo';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import OneDriveFilesTable from './Sid';
import Input from '@mui/material/Input';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import backup from './backupvideo.mp4'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function BackupWizard({clientId,selectedrow, anchorCloseHandel}) {
  const steps = ['Type of Backup', 'overview','Job Details'];
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [dialogWidth] = useState('md');
  const [backdropOpen,setBackdropOpen]=useState(false);
  const [isIncremental,setIsIncremental]=useState("1");

  const ticksvg = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="40" viewBox="0 0 48 48">
  <linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
  </svg>;
  const onedriveLogo = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
  <path fill="#084593" d="M24.5 8A14.5 14.5 0 1 0 24.5 37A14.5 14.5 0 1 0 24.5 8Z"></path><path fill="#0556ab" d="M16.155,15.972c-1.32-0.505-2.753-0.781-4.25-0.781C5.33,15.191,0,20.521,0,27.096 c0,2.476,0.757,4.774,2.05,6.678c0.061-0.026,16.445-6.889,26.406-10.888C22.952,19.568,17.903,16.641,16.155,15.972z"></path><path fill="#18b0ff" d="M48,29.373c0-5.317-4.31-9.627-9.627-9.627c-0.997,0-1.958,0.152-2.863,0.433 c-0.996,0.31-3.652,1.342-7.054,2.708c8.377,5.05,17.79,10.996,18.252,11.288C47.525,32.76,48,31.123,48,29.373z"></path><path fill="#2cceff" d="M46.709,34.175c-0.463-0.292-9.875-6.238-18.252-11.288C18.495,26.885,2.111,33.748,2.05,33.774 C2.467,34.388,5.627,39,11.904,39c5.03,0,16.176,0,26.354,0C43.669,39,46.148,35.146,46.709,34.175z"></path>
  </svg>;
  const [activeStep, setActiveStep] = React.useState(0);

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
        selector: row => row.name,
    },
    {
      name: 'UserId',
      selector: row => row.userId,
  }];


const stepData =[
         <Stack spacing={1} sx={{marginTop:'10px'}}>
         <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
         <FormControl>
      <FormLabel><b>Backup Type</b></FormLabel>
      <RadioGroup row defaultValue={isIncremental} onChange={(e)=>{
        setIsIncremental(e.target.value);
      }}>
        <FormControlLabel value="1" control={<Radio />} label="Incremental" />
        <FormControlLabel value="2" control={<Radio />} label="Full" />
      </RadioGroup>
    </FormControl>
          </div>
         </Stack>,

         <div>
         <Accordion defaultExpanded>
         <AccordionSummary
           expandIcon={<ArrowDropDownIcon />}
         >
          <Typography><b>Selected User Details</b></Typography>
         </AccordionSummary>
         <AccordionDetails>
         <Stack spacing={1}>
         <OneDriveFilesTable columns={columns} data={[selectedrow]}/>
         </Stack>
         </AccordionDetails>
       </Accordion>
       </div>
           ,
         <Stack spacing={1}>
           <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
           {ticksvg}</div>
           <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
          <Typography ><b>Backup Job submitted sucessfully</b></Typography>
          </div>
         </Stack>
        ]

  const handleNext = () => {
    if(activeStep==2)
    {
        handleClose();
        return;
    }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setOpen(false);
    setIsIncremental("1");
    anchorCloseHandel();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('paper')} size='large' variant='contained' sx={{ textTransform: 'none', borderRadius: '20px' }}><b>Backup</b></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={dialogWidth}
      >
        <DialogTitle >
            <Stack direction="row"><b>Backup Options</b> 
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
        <video width="200" height="100" controls={false} autoPlay loop muted>
        <source src={backup} type="video/mp4" />
        Your browser does not support the video tag.
      </video></div>
      </Stack>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} marginTop='0px'>
    
    <Grid container spacing={0} dividers={true}>
        <Grid item xs={3}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
        </Grid>
        <Grid item xs={8}>
        {stepData[activeStep]}
        </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
        {(activeStep>0) && activeStep<=1?(
          <Button variant="outlined" onClick={handleBack} sx={{ textTransform: 'none' }}><b>Back</b></Button>):(undefined)}
          {(activeStep>=0) && activeStep<2?(
          <Button onClick={handleClose} variant="outlined" sx={{ textTransform: 'none' }}><b>Cancel</b></Button>):(undefined)}
          <Button variant="outlined" onClick={handleNext} sx={{ textTransform: 'none' }}><b>{activeStep != 2?("Next"):("Close")}</b></Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
