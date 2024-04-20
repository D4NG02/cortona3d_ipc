import { MenuItem } from '@mui/material';
import React from 'react';

export default function IsolatePart(props) {
    const handleIsolatePart = () => {

        try {
            window.currentOperation = "isolate";
            window.Cortona3DSolo.app.ipc.resetCurrentSheet(false);
            window.Cortona3DSolo.app.restoreObjectProperty(null, window.Cortona3DSolo.app.PROPERTY_TRANSPARENCY, false);

            window.Cortona3DSolo.app.ipc.didIsolate(props.index)
            window.setCloseContextMenuTable();
        } catch (err) {
            window.setCloseContextMenuTable();
        }
    }
    return (
        <MenuItem variant="h5" component="h5" key={2} id="ContextMenu-IsolateBtn" className="ContextMenuItem" onClick={handleIsolatePart}>{window.contextIsolate}</MenuItem>
    );
}
