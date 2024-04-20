import React, { useState } from 'react';
import { Slider, ToggleButton, Typography } from '@mui/material';
import TransparencyIcon from '@mui/icons-material/SettingsBrightness';
import { CustomTheme, color } from '../../CustomStyle';

const transparent = {
    width: '10%',
    zIndex: '100',
    position: 'absolute',
    backgroundColor: color.flagBlue,

    [CustomTheme.breakpoints.down('md')]: {
        top: 222,
        margin: '0 44px',
        padding: '2px 14px',
    },
    [CustomTheme.breakpoints.up('md')]: {
        top: 372,
        margin: '0 70px',
        padding: '14px 22px',
    },
}

export default function BtnTransparent() {
    const [disable, setDisable] = useState(true);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    
    window.setDisableTransparent = (input) => {
        setDisable(input);
    };

    const handleClick = (event) => {
        // Close other button
        if(!open){
            window.MenuOnce()
        }

        setOpen(!open);

        if (window.selectObject) {
            let transparent = window.setTransparencySlider(window.selectObject.handle, window.selectObject.name);
            setValue(transparent);
            window.Cortona3DSolo.app.setObjectPropertyf(window.selectObject.handle, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, false, transparent);
        }
    };
    window.setDisplayTransparent = (input) => {
        setOpen(input);
    };
    
    const handleTransparentChange = (event, newValue) => {
        if (window.selectObject) {
            setValue(newValue);
            window.Cortona3DSolo.app.setObjectPropertyf(window.selectObject.handle, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, false, newValue);
        } else {
            setValue(0);
        }
    };

    return (
        <>
            <ToggleButton role="btnSideBar1" title="Transparency" value="Transparency" selected={open} onClick={handleClick}>
                <TransparencyIcon />
            </ToggleButton>

            <Typography variant="body1" component='div' sx={transparent} hidden={!open}>
                <Slider color='secondary' id="transparentSlider" size='small'
                    value={value} step={0.05} min={0} max={1}
                    onChange={handleTransparentChange}
                    aria-label="Transparent Track"
                    valueLabelDisplay="off" />
            </Typography>
        </>
    );
}
