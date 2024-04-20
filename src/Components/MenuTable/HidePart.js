import { MenuItem } from '@mui/material';
import React from 'react';

export default function HidePart(props) {
    const handleHidePart = () => {
        try {
            console.log("HidePart " + props.index)
            window.Cortona3DSolo.app.ipc.toggleItemVisibility(props.index)
            window.setCloseContextMenuTable();
        } catch (err) {
            window.setCloseContextMenuTable();
        }
    }

    return (
        <MenuItem variant="h5" component="h5" key={1} id="ContextMenu-HideBtn" className="ContextMenuItem" onClick={handleHidePart}>{window.contextHide}</MenuItem>
    );
}
