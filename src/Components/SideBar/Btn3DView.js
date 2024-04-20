import React, { useState } from 'react';
import { ToggleButton, Typography } from '@mui/material';
import { CustomTheme } from '../../CustomStyle';
import View_3D from '../../Assets/3d.svg';
import View3D from './View3D';

const popperStyle = {
    zIndex: '100',
    position: 'absolute',
    
    [CustomTheme.breakpoints.down('md')]: {
        top: '74px',
        margin: '0 44px',
    },
    [CustomTheme.breakpoints.up('md')]: {
        top: '124px',
        margin: '0 70px',
    },
}

export default function Btn3DView() {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        // Close other button
        if(!open){
            window.MenuOnce()
        }

        setOpen(!open);
    };
    
    window.setDisplay3DView = (input) => {
        setOpen(input);
    };

    return (
        <>
            <ToggleButton role="btnSideBar1"
                    value="Btn3DView"
                    selected={open}
                    onClick={handleClick}>
                <img src={window.baseUri + View_3D} alt={View_3D}/>
            </ToggleButton>

            <Typography variant="body1" component='div' sx={popperStyle} hidden={!open}>
                <View3D />
            </Typography>
        </>
    );
}
