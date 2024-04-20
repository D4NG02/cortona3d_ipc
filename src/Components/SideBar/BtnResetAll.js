import React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ResetIcon from '@mui/icons-material/Cached';

export default function BtnResetAll() {
    
    const handleClick = (event) => {
        // Close other button
        window.MenuOnce()

        // 3D image
        window.Cortona3DSolo.app.restoreObjectProperty(0, window.Cortona3DSolo.app.PROPERTY_DIFFUSE_COLOR, true);
        window.Cortona3DSolo.app.restoreObjectProperty(0, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, true);
        window.canvasResize()

        // Cartesion line
        if (window.Cortona3DSolo.app.isRotationCenterVisible() === true) {
            window.Cortona3DSolo.app.setRotationCenterVisibility(false);
            window.Cortona3DSolo.app.setRotationCenterToSelectedObjects(false);
        }

        // table
        window.$("tr").removeClass("selected")
    };

    return (
        <ToggleButton role="btnSideBar1" value="ResetAll" onClick={handleClick}>
            <ResetIcon />
        </ToggleButton>
    );
}
