import React, { useState } from 'react';
import { ToggleButton, Typography } from '@mui/material';

import { CustomTheme } from '../../CustomStyle'
import View_Multi from '../../Assets/cube.svg';
import MultiView from './MultiView';

const popperStyle = {
    zIndex: '100',
    position: 'absolute',
    
    [CustomTheme.breakpoints.down('md')]: {
        top: '37px',
        margin: '0 44px',
    },
    [CustomTheme.breakpoints.up('md')]: {
        top: '62px',
        margin: '0 70px',
    },
}

export default function BtnMultiView() {
    const [open, setOpen] = useState(false);
    const handleClick = (event) => {
        // Close other button
        if(!open){
            window.MenuOnce()
        }

        setOpen(!open);
    };
    window.setDisplayMultiView = (input) => {
        setOpen(input);
    };


    return (
        <>
            <ToggleButton
                role="btnSideBar1"
                value="multiView"
                selected={open}
                onClick={handleClick}>
                    <img src={window.baseUri + View_Multi} alt='Multi View' />
            </ToggleButton>

            <Typography variant="body1" component='div' sx={popperStyle} hidden={!open}>
                <MultiView />
            </Typography>
        </>
    );
}
