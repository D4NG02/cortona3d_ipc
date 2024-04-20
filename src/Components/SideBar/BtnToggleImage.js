import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import Shapes2DIcon from '@mui/icons-material/InsertPhoto';

export default function BtnToggleImage() {
    const [select, setSelect] = useState(false);
    const handleClick = (event) => {
        // Close other button
        window.MenuOnce()

        setSelect(!select)
        window.Cortona3DSolo.app.ipc.toggleDrawingDisplayMode();
    };
    window.setSelectToggleImage = (input) => {
        setSelect(input);
    };
    
    const [disable, setDisable] = useState(false);
    window.setDisableToggleImage = (input) => {
        setDisable(input);
    };

    return (
        <ToggleButton disabled={disable} role="btnSideBar1" value="ToggleImage" selected={select} onClick={handleClick}>
            <Shapes2DIcon />
        </ToggleButton>
    );
}
