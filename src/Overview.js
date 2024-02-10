import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { Container, Typography ,Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import RecoveryPoint from './RecoveryPoints';

const style = {
  p: 0,
  width: '100%',
  maxWidth: 360,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};

export default function Pie({clientId}) {
  
  const [slaPer,setSlaPer]=React.useState(100);
  const [totalTeams,setTotalTeams]=React.useState(0);
const [backedupTeams,setBakedUpTeams]=React.useState(0);
const data = [
  { value: slaPer, label: 'Backed up users' ,color: 'green'},
  { value: 100-slaPer, label: 'Pending users', color:'red'},
];


const callApi=(a,b)=>{
  console.log(a);
  console.log(b);
}

const discovery = async () => {
  try {
  var url = `http://localhost:8080/associations/clients/${clientId}`;
    const response = await axios.get(url);
      if(response.data.length != 0)
      {
      const users = response.data.filter(item => item.status === 1).length;
      const backedUpusers = response.data.filter(item => item.lastJobStatus === "COMPLETED").length;
      if(users >= 0)
      {
          const per = (3*100)/users;
          setSlaPer(per);
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  React.useEffect(()=>{
      discovery();
  },[])
  return (
    <Container sx={{marginTop:'10px',marginBottom:'10px'}}>
              <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 10 }}>
            <Grid item xs={6}>
                      <b>Backup Stats</b>
                     <Paper elevation={24} sx={{margin:'20px',padding:'10px'}}>
                      <Typography>Backup size  :  10100</Typography>
                      <Typography>Backup size  :  10100</Typography>
                      <Typography>Backup size  :  10100</Typography>
                      <Typography>Backup size  :  10100</Typography>
                     </Paper>
            </Grid>
            <Grid item xs={6}>
              <b>Backup Health - {slaPer}%</b>
                  <PieChart
                  sx={{margin:'10px'}}
          series={[
            {
              data,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          height={200}
        />
            </Grid>
            <Grid item xs={6}>
            <b>Summary</b>
            </Grid>
            <Grid item xs={6} >
            <b>RecoveryPoints</b>
            <RecoveryPoint/>
            </Grid>
          </Grid>
        </Container>
  );
}