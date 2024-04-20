import { MenuItem } from '@mui/material';
import React from 'react';

export default function ShowPart() {
    window.handleShowPart = function handleShowPart() {
        window.Cortona3DSolo.app.ipc.resetCurrentSheet(false);
        window.Cortona3DSolo.app.restoreObjectProperty(null, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, false);

        window.setCloseContextMenuTable();
    }

    return (
        <MenuItem variant="h5" component="h5" key={3} id="ContextMenu-ShowBtn" className="ContextMenuItem" onClick={window.handleShowPart}>{window.contextShowAll}</MenuItem>
    );
}
