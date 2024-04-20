import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function BtnManual() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        if(!open){
            window.MenuOnce()
        }
        
        setOpen(!open)
        window.setDisplayInfo()
        window.canvasResize();
    };


    return (
        <ToggleButton role="btnSideBar1" value="Manual" selected={open} onClick={handleClick}>
            <ListAltIcon />
        </ToggleButton>
    );
}
