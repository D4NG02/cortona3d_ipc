import { MenuItem } from '@mui/material';
import React from 'react';

export default function CopyPartNumber(props) {
    const handleCopyPart = () => {
        let partNumber = window.Cortona3DSolo.app.ipc.interactivity.getItemInfo(props.row).roles[1];
        if (navigator.clipboard.writeText) {
            console.log('Can copy text to clipboard');
            copyPageUrl(partNumber)
        } else {
            console.log('Cant copy text to clipboard');
        }

        window.setCloseContextMenuTable();
    }
    
    async function copyPageUrl(text) {
        try {
          await navigator.clipboard.writeText(text);
            window.alert('Copy! ' + text)
        } catch (err) {
            window.alert('Opps! ' +err)
        }
    }
    
    return (
        <MenuItem variant="h5" component="h5" key={4} id="ContextMenu-CopyBtn" className="ContextMenuItem" onClick={handleCopyPart}>{window.contextCopy}</MenuItem>
    );
}
