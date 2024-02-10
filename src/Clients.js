import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Container } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import OneDriveFilesTable from './Sid';
import Link from '@mui/material/Link';
import AppsIcon from '@mui/icons-material/Apps'
import Input from '@mui/material/Input';
import ClientCreation from './ClientCreationWizard';


function Clients() {
    const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  //const history = useHistory();

  useEffect(() => {
    // Fetch clients data from the API
    fetch('http://localhost:8080/clients')
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
        setFilteredClients(data); // Initially, show all clients
      })
      .catch((error) => console.error('Error fetching clients:', error));
  }, []);

  useEffect(() => {
    // Filter clients based on search term
    const results = clients.filter((client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchTerm, clients]);


  const columns = [
    {
      cell: (row) => (
        <div>
            <AppsIcon style={{ fill: '#43a047' }} />
        </div>
      ),
      width: '56px',
      style: {
        borderBottom: '1px solid #FFFFFF',
        marginBottom: '-1px',
      },
    },
    {
      name: 'id',
      selector: row => row.id,
  },
    {
        name: 'Name',
        sortable:true,
        selector: row => row.name,
        cell: (row) => (
          <div>
            <Link
                  component="button"
                  variant="body1"
                  underline="hover"
                  sx={{textTransform:'none'}}
                  onClick={(e) => {
                    e.preventDefault();
                          navigate("/clientdetails",{state:{id:row.id}});
                  }}
                >
                  <span style={{ color: '#202124', fontSize: '14px', fontWeight: 500 }}>{row.name}</span>
                </Link>
             
           
          </div>),
    },
    {
      name:'creationTime',
      selector: row => row.creationTime,

    },
    {
      name:'lastJobId',
      selector: row => row.lastJobId,
    }
    
];

  return (
    
    <Container sx={{marginTop:'50px'}}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Input placeholder="search client" sx={{marginRight:'15px'}} onChange={(e) => setSearchTerm(e.target.value)} />
      <ClientCreation/>
      </div>
      <OneDriveFilesTable data={filteredClients} name="Clients" columns={columns}/>
      </Container>
  );
}

export default Clients;
