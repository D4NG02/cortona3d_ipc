import React, { useState } from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import ShowPart from './ShowPart';
import HidePart from './HidePart';
import IsolatePart from './IsolatePart';
import CopyPartNumber from './CopyPartNumber';

export default function ContextMenuTable() {

    const [state, setState] = useState({
        mouseX: null,
        mouseY: null
    });
    const [obj, setObj] = useState(null);
    const [open, setOpen] = useState(false);
    const [Index, setIndex] = useState(null);

    window.setContextMenuTable = function setContextMenuTable(clientX, clientY, object, indexValue) {
        setState({
            mouseX: (window.innerWidth * (6.15/10)) + clientX,
            mouseY: (window.innerHeight * (1/10)) + clientY,
        });
        setOpen(true);
        setObj(object);
        setIndex(indexValue);
    }
    window.setCloseContextMenuTable = function setCloseContextMenuTable() {
        setOpen(false);
        setState({
            mouseX: null,
            mouseY: null
        });
    };

    
    // Sheet Change
    window.handleViewChange = function handleViewChange(sheetID) {
        try {
            window.Cortona3DSolo.app.ipc.setCurrentSheet(sheetID, true);
            window.handleShowPart()
            window.Cortona3DSolo.app.didSetSelectedContext()
        } catch (err) { }
    }

    return (
        <Menu className='ContextMenuTable'
            open={open}
            onClose={window.setCloseContextMenuTable}
            anchorReference="anchorPosition"
            anchorPosition={
                state.mouseY !== null ? { top: state.mouseY, left: state.mouseX } : undefined
            }>

            {/*<MenuItem variant="h5" component="h5" className={"ContextMenuItem"} onClick={handleAddToBasket}>Add To Basket</MenuItem>*/}
            {/*<Divider className={"ContextMenuDivider"}/>*/}
            <HidePart index={Index} />
            <ShowPart />
            <IsolatePart index={Index} />
            <CopyPartNumber row={Index} />
            <Divider key={5} className={"ContextMenuDivider"}/>
        </Menu>
    );
}