import React, { useState, useEffect } from 'react';
import OneDriveFilesTable from "./Sid";
import axios from 'axios';
import Input from '@mui/material/Input';
import Actions from './Actions';
import ContentTabActions from './ContentTabActions';

export default function ContentTab({clientId})
{
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers,setFilteredUsers]=useState([]);
    const onedriveLogo = <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
  <path fill="#084593" d="M24.5 8A14.5 14.5 0 1 0 24.5 37A14.5 14.5 0 1 0 24.5 8Z"></path><path fill="#0556ab" d="M16.155,15.972c-1.32-0.505-2.753-0.781-4.25-0.781C5.33,15.191,0,20.521,0,27.096 c0,2.476,0.757,4.774,2.05,6.678c0.061-0.026,16.445-6.889,26.406-10.888C22.952,19.568,17.903,16.641,16.155,15.972z"></path><path fill="#18b0ff" d="M48,29.373c0-5.317-4.31-9.627-9.627-9.627c-0.997,0-1.958,0.152-2.863,0.433 c-0.996,0.31-3.652,1.342-7.054,2.708c8.377,5.05,17.79,10.996,18.252,11.288C47.525,32.76,48,31.123,48,29.373z"></path><path fill="#2cceff" d="M46.709,34.175c-0.463-0.292-9.875-6.238-18.252-11.288C18.495,26.885,2.111,33.748,2.05,33.774 C2.467,34.388,5.627,39,11.904,39c5.03,0,16.176,0,26.354,0C43.669,39,46.148,35.146,46.709,34.175z"></path>
  </svg>;
    useEffect(() => {
        discovery();
        setFilteredUsers(data);
      }, [clientId]);

    const columns = [
        {
          cell: () => (
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
            name: 'Name',
            selector: row => row.name,
        },
        {
          name: 'UserId',
          selector: row => row.userId,
      },
        {
          name:'LastJobId',
          selector: row => row.lastJobId,
    
        },
        {
          name:'LastJobStatus',
          selector: row => row.lastJobStatus,
    
        },
        {
          name:'Actions',
          cell: row => <ContentTabActions size="small" row={row} clientId={clientId} />,
          allowOverflow: true,
          button: true,
          width: '56px',
        },
        
    ];

    const discovery = async () => {
        try {
        var url = `http://localhost:8080/associations/clients/${clientId}`;
          const response = await axios.get(url);
          if (response.data.length > 0) {
            setData(response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        const results = data.filter((client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
      }, [searchTerm, data]);
    
      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    

      return(
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Input placeholder="search" sx={{marginRight:'0px'}} onChange={handleSearchChange} autoFocus/>
                </div>
                <OneDriveFilesTable data={filteredUsers} columns={columns} selectableRows={false}/>
            </div>
      );

};