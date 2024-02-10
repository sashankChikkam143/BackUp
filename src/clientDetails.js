// src/clientDetails.js

import React, { useState, useEffect } from 'react';
import { AppBar, Button,Grid,Tab, ButtonGroup,Tabs,Snackbar, Container, TextField, Typography, Paper ,Alert} from '@mui/material';
import axios from 'axios';
import Overview from './Overview';
import {useLocation,useNavigate} from 'react-router-dom';
import Divider from '@mui/material/Divider';
import AddContent from './AddContent';
import ContentTab from './ContentTab';
// import { SnackbarProvider, useSnackbar } from 'notistack';
// import SnackbarProvider from '@mui/material/'

export default function ClientDetails() {

  const azuresvg = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 256 242"><defs><linearGradient id="logosMicrosoftAzure0" x1="58.972%" x2="37.191%" y1="7.411%" y2="103.762%"><stop offset="0%" stop-color="#114A8B"/><stop offset="100%" stop-color="#0669BC"/></linearGradient><linearGradient id="logosMicrosoftAzure1" x1="59.719%" x2="52.691%" y1="52.313%" y2="54.864%"><stop offset="0%" stop-opacity=".3"/><stop offset="7.1%" stop-opacity=".2"/><stop offset="32.1%" stop-opacity=".1"/><stop offset="62.3%" stop-opacity=".05"/><stop offset="100%" stop-opacity="0"/></linearGradient><linearGradient id="logosMicrosoftAzure2" x1="37.279%" x2="62.473%" y1="4.6%" y2="99.979%"><stop offset="0%" stop-color="#3CCBF4"/><stop offset="100%" stop-color="#2892DF"/></linearGradient></defs><path fill="url(#logosMicrosoftAzure0)" d="M85.343.003h75.753L82.457 233a12.078 12.078 0 0 1-11.442 8.216H12.06A12.06 12.06 0 0 1 .633 225.303L73.898 8.219A12.08 12.08 0 0 1 85.343 0z"/><path fill="#0078D4" d="M195.423 156.282H75.297a5.56 5.56 0 0 0-3.796 9.627l77.19 72.047a12.138 12.138 0 0 0 8.28 3.26h68.02z"/><path fill="url(#logosMicrosoftAzure1)" d="M85.343.003a11.98 11.98 0 0 0-11.471 8.376L.723 225.105a12.045 12.045 0 0 0 11.37 16.112h60.475a12.926 12.926 0 0 0 9.921-8.437l14.588-42.991l52.105 48.6a12.327 12.327 0 0 0 7.757 2.828h67.766l-29.721-84.935l-86.643.02L161.37.003z"/><path fill="url(#logosMicrosoftAzure2)" d="M182.098 8.207A12.06 12.06 0 0 0 170.67.003H86.245c5.175 0 9.773 3.301 11.428 8.204L170.94 225.3a12.062 12.062 0 0 1-11.428 15.92h84.429a12.062 12.062 0 0 0 11.425-15.92z"/></svg>
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('overview');
  const [clientId,setClientId] = useState(location.state.id);
  const [columns, setColumns] = useState([]);
  const [azureAppDetails, setAzureAppDetails] = useState({});

  const onedriveLogo = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
  <path fill="#084593" d="M24.5 8A14.5 14.5 0 1 0 24.5 37A14.5 14.5 0 1 0 24.5 8Z"></path><path fill="#0556ab" d="M16.155,15.972c-1.32-0.505-2.753-0.781-4.25-0.781C5.33,15.191,0,20.521,0,27.096 c0,2.476,0.757,4.774,2.05,6.678c0.061-0.026,16.445-6.889,26.406-10.888C22.952,19.568,17.903,16.641,16.155,15.972z"></path><path fill="#18b0ff" d="M48,29.373c0-5.317-4.31-9.627-9.627-9.627c-0.997,0-1.958,0.152-2.863,0.433 c-0.996,0.31-3.652,1.342-7.054,2.708c8.377,5.05,17.79,10.996,18.252,11.288C47.525,32.76,48,31.123,48,29.373z"></path><path fill="#2cceff" d="M46.709,34.175c-0.463-0.292-9.875-6.238-18.252-11.288C18.495,26.885,2.111,33.748,2.05,33.774 C2.467,34.388,5.627,39,11.904,39c5.03,0,16.176,0,26.354,0C43.669,39,46.148,35.146,46.709,34.175z"></path>
  </svg>;
  useEffect(() => {
    fetchClientDetails();
  }, []);
  

  const fetchClientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/clients/${clientId}`);
      var app=response.data.appDetails;
      var appDetails = app.split("@");
      response.data["AppId"]=appDetails[0];
      response.data["AppSecret"]=appDetails[1];
      response.data["TenatId"]=appDetails[2];
      delete response.data.appDetails;

      setAzureAppDetails(response.data);
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end',marginTop:'10px' }}>
        {azuresvg}
        <Typography variant="h5" gutterBottom sx={{ marginLeft: '10px', marginBottom: '0' }}>
          {azureAppDetails.name }
        </Typography>
      </div>
      <Divider sx={{marginTop:'40px', marginBottom:'10px'}}/>
      <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end',marginTop:'10px' }}>
        <Button  sx={{textTransform:'none',borderRadius:'20px'}} onClick={(e)=>{
             setCurrentTab("overview")
        }} variant="outlined" size='large'><b>overview</b></Button>
        <Button sx={{textTransform:'none',borderRadius:'20px',marginLeft:'20px'}} onClick={(e)=>{
             setCurrentTab("users")
        }} variant="outlined" size='large'><b>users</b></Button>
        <Button sx={{textTransform:'none',borderRadius:'20px',marginLeft:'20px'}} onClick={(e)=>{
             setCurrentTab("configurations")
        }} variant="outlined" size='large'><b>configurations</b></Button>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end',marginLeft:'auto' }}>
        <Button variant='contained' sx={{textTransform:'none',borderRadius:'20px',marginRight:'5px'}} size='large' onClick={(e)=>{
          e.preventDefault();
          navigate("/browse", { state: { id: clientId,clientName:azureAppDetails.name } });
        }}><b>Browse</b></Button>
        <AddContent clientId={clientId}/>
        <clientCreation/>
      </div>
      </div>
      </div>
      <Divider sx={{marginTop:'20px', marginBottom:'10px'}}/>
      <div>
        {currentTab==='overview'?(<Overview/>):(currentTab==='users'?(<ContentTab clientId={clientId}/>):(<clientCreation/>))}
      </div>
    </Container>
  );
}
        