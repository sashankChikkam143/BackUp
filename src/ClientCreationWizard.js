import React, { useState, useEffect } from 'react';
import { Box,Chip,Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

export default function ClientCreation() {
  const steps = ['Enter clientname', 'Enter Azure App details', 'Review','Client creation sucessfull'];
  const [clientName, setClientName] = useState('');
  const [appId, setAppId] = useState('');
  const [appSecret, setAppSecret] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const [dialogWidth] = useState('md');
  const ticksvg = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="40" viewBox="0 0 48 48">
  <linearGradient id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z" opacity=".05"></path><path d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z" opacity=".07"></path><path fill="#fff" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
  </svg>;
  const azuresvg = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 256 242"><defs><linearGradient id="logosMicrosoftAzure0" x1="58.972%" x2="37.191%" y1="7.411%" y2="103.762%"><stop offset="0%" stop-color="#114A8B"/><stop offset="100%" stop-color="#0669BC"/></linearGradient><linearGradient id="logosMicrosoftAzure1" x1="59.719%" x2="52.691%" y1="52.313%" y2="54.864%"><stop offset="0%" stop-opacity=".3"/><stop offset="7.1%" stop-opacity=".2"/><stop offset="32.1%" stop-opacity=".1"/><stop offset="62.3%" stop-opacity=".05"/><stop offset="100%" stop-opacity="0"/></linearGradient><linearGradient id="logosMicrosoftAzure2" x1="37.279%" x2="62.473%" y1="4.6%" y2="99.979%"><stop offset="0%" stop-color="#3CCBF4"/><stop offset="100%" stop-color="#2892DF"/></linearGradient></defs><path fill="url(#logosMicrosoftAzure0)" d="M85.343.003h75.753L82.457 233a12.078 12.078 0 0 1-11.442 8.216H12.06A12.06 12.06 0 0 1 .633 225.303L73.898 8.219A12.08 12.08 0 0 1 85.343 0z"/><path fill="#0078D4" d="M195.423 156.282H75.297a5.56 5.56 0 0 0-3.796 9.627l77.19 72.047a12.138 12.138 0 0 0 8.28 3.26h68.02z"/><path fill="url(#logosMicrosoftAzure1)" d="M85.343.003a11.98 11.98 0 0 0-11.471 8.376L.723 225.105a12.045 12.045 0 0 0 11.37 16.112h60.475a12.926 12.926 0 0 0 9.921-8.437l14.588-42.991l52.105 48.6a12.327 12.327 0 0 0 7.757 2.828h67.766l-29.721-84.935l-86.643.02L161.37.003z"/><path fill="url(#logosMicrosoftAzure2)" d="M182.098 8.207A12.06 12.06 0 0 0 170.67.003H86.245c5.175 0 9.773 3.301 11.428 8.204L170.94 225.3a12.062 12.062 0 0 1-11.428 15.92h84.429a12.062 12.062 0 0 0 11.425-15.92z"/></svg>



  const [activeStep, setActiveStep] = React.useState(0);

const stepData =[<Stack spacing={10}>
  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
    {azuresvg}</div>
    <TextField label="Client Name" variant="standard" onChange={(e)=>{setClientName(e.target.value)}} focused required/>
  </Stack>,<Stack spacing={3}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
          {azuresvg}</div>
      
       <TextField label="App ID" onChange={(e)=>{setAppId(e.target.value)}} variant="standard" focused required/>
       <TextField label="App Secret Key"  onChange={(e)=>{setAppSecret(e.target.value)}} variant="standard" focused required/>
       <TextField label="Tenant Id"  onChange={(e)=>{setTenantId(e.target.value)}} variant="standard" focused required/>
        </Stack>,
        <Stack spacing={3}>
         <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
           {azuresvg}</div>
         <Stack spacing={3}>
         <Stack spacing={3} direction="row"><Typography ><b>Name :</b></Typography> <Typography >{clientName}</Typography></Stack>
          <Stack spacing={3} direction="row"><Typography ><b>App Id :</b></Typography> <Typography >{appId}</Typography></Stack>
          <Stack spacing={3} direction="row"><Typography ><b>App secret :</b></Typography> <Typography >{appSecret}</Typography></Stack>
          <Stack spacing={3} direction="row"><Typography ><b>Teanat Id :</b></Typography> <Typography >{tenantId}</Typography></Stack>
         </Stack>
         </Stack>,
      
         <Stack spacing={1}>
         <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
           {azuresvg}</div>
           <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
           {ticksvg}</div>
           <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', marginLeft:'auto', marginRight:'auto' }}>
          <Typography ><b>{clientName}</b> created sucessfully</Typography>
          </div>
         </Stack>
        ]

  const handleNext = () => {
    if(activeStep==3)
    {
      handleClose();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const createClient = async () => {
    try {
      const client = {
        name: clientName,
        appId: appId,
        appSecret: appSecret,
        tenantId: tenantId
      };

      const url = `http://localhost:8080/clients`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(url, client, config);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setAppId("");
    setClientName("");
    setAppSecret("");
    setTenantId("");
    setActiveStep(0);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen('paper')} size='large' variant='contained' sx={{ textTransform: 'none', borderRadius: '20px' }}><b>Add App</b></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={dialogWidth}
      >
        <DialogTitle id="scroll-dialog-title">Add Onedrive App</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
    
    <Grid container spacing={2} dividers={true}>
        <Grid item xs={4} >
        
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
        {(activeStep>0) && activeStep<=2?(
          <Button variant="outlined" onClick={handleBack} sx={{ textTransform: 'none' }}><b>Back</b></Button>):(undefined)}
          {(activeStep>=0) && activeStep<3?(
          <Button onClick={handleClose} variant="outlined" sx={{ textTransform: 'none' }}><b>Cancel</b></Button>):(undefined)}
          <Button variant="outlined" onClick={handleNext} sx={{ textTransform: 'none' }}><b>{activeStep != 3?("Next"):("Close")}</b></Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
