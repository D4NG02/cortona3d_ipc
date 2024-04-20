import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function BtnPartShow() {
    const [disable, setDisable] = useState(true);

    const handleClick = (event) => {
        // Close other button
        window.MenuOnce()

        setDisable(true)
        
        if (window.selectObject) {
            window.Cortona3DSolo.app.setObjectPropertyf(window.selectObject.handle, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, true, 0);
        }
    };
    
    window.setDisablePartShow = (input) => {
        setDisable(input);
    };

    return (
        <ToggleButton role="btnSideBar1" value="PartShow" onClick={handleClick}>
            <VisibilityIcon />
        </ToggleButton>
);
}
