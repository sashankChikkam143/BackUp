import React from 'react';
import MoreVert from '@mui/icons-material/MoreVert';
//import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography,Divider,IconButton,Menu,MenuItem} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import axios from 'axios';
import RestoreWizards from './RestoreWizard';

// eslint-disable-next-line react/prop-types
export default function Actions ({ row, size,clientId}) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
				<MenuItem>Item One</MenuItem>

				<MenuItem>Item Two</MenuItem>

				<Divider />

				<RestoreWizards clientId={clientId} row={row} handleAnchorClose={handleClose}/>
			</Menu>
		</div>
	);
};