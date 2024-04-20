import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function BtnPartHide() {
    const [disable, setDisable] = useState(true);

    const handleClick = (event) => {
        // Close other button
        window.MenuOnce()

        setDisable(true)

        if (window.selectObject) {
            window.Cortona3DSolo.app.setObjectPropertyf(window.selectObject.handle, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, true, 1);
        }
    };

    window.setDisablePartHide = (input) => {
        setDisable(input);
    };

    return (
        <ToggleButton role="btnSideBar1" value="PartHide" onClick={handleClick}>
            <VisibilityOffIcon />
        </ToggleButton>
    );
}
