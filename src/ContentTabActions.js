import React from 'react';
import MoreVert from '@mui/icons-material/MoreVert';
import { Typography,Divider,IconButton,Menu,MenuItem} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import axios from 'axios';
import BackupWizard from './BackupWizard';

export default function ContentTabActions ({ clientId,row, size}) {

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
    const removeAssociations = async (clientId,userId) => {
        try {
            var selectedData=[]
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

	const deleteRow = async () => {
        setAnchorEl(null);
        try {
            const requestData = {
                typeOfItem:row.itemType_i,
	            selectedItemId: row.id
            };

            const response = await axios.post(`http://localhost:8080/restore/clients/${row.clientId_i}/users/${row.userId_s}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            console.error("Error fetching data:", err);
        }
		// if (onDeleteRow) {
		// 	onDeleteRow(row);
		// }
	};

	return (
		<div>
			<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick} size={size}>
				<MoreVert />
			</IconButton>
			<Menu
				id="menu"
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<BackupWizard clientId={clientId} selectedrow={row} anchorCloseHandel={handleClose}/>
				<MenuItem>Exclude From Backup</MenuItem>
                <MenuItem>Remove From Content</MenuItem>
			</Menu>
		</div>
	);
};