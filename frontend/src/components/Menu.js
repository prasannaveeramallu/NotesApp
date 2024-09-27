import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const options = [
  'Change password',
  'Delete account'

];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate()

  const [val, setVal] = useState()  

/*  const handleChange = (e) => {
    setVal(e.target.value)
    console.log(val)
  }  */

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);

   

  };
const handleMenuItemChange = (value) => {
    if (value === 'Change password'){
        setVal(value)
        navigate('/changepassword')
    }
    else {

        navigate('/deleteacc')
    }
   
}
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
       
        
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        
      
        <MenuItem value='Change password' onClick={() =>  handleMenuItemChange('Change password') }>Change Password</MenuItem>
        <MenuItem value='Delete account' onClick={() =>  handleMenuItemChange('Delete account') }>Delete Account </MenuItem>
        
      
      </Menu>
    </div>
  );
}
