import React, { useState } from 'react';
import { ToggleButton, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { CustomTheme } from '../../CustomStyle';


export default function BtnMenuView() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        // Close other button
        if (!open) {
            window.MenuOnce()
        }

        setOpen(true);
        setAnchorEl(event.currentTarget);

        ListView()
    };
    window.setCloseMenuView = function setCloseMenuView() {
        // window.$("div.ContextMenuView ul > .ContextMenuItem-view").remove()

        setOpen(false);
        setAnchorEl(null);
    };

    function ListView() {
        var sheets = window.Cortona3DSolo.app.modelInfo.sheets
        var selectedSheet = window.Cortona3DSolo.app.ipc.getCurrentSheet()

        for (const sheet in sheets) {
            if (Object.hasOwnProperty.call(sheets, sheet)) {
                const element = sheets[sheet];
                window.$("div.ContextMenuView ul").ready(function () {
                    var h5 = document.createElement('h5');
                    h5.innerText = element.description;
                    h5.setAttribute('value', element.id);


                    if (element.id == selectedSheet.id) {
                        h5.setAttribute('class', "ContextMenuItem-view Mui-selected");
                    } else {
                        h5.setAttribute('class', "ContextMenuItem-view");
                        h5.setAttribute('onclick', "scriptSheetChange('" + element.id + "')");
                    }
                    window.$("div.ContextMenuView ul").append(h5);
                });

            }
        }
    }

    const [sheet, setSheet] = useState([]);
    window.setSheetMenuOverlay = function setSheetMenuOverlay(key, sheetName, sheetID) {
        console.log(sheetName)
        setSheet(sheet.concat(<MenuItem selected={key == 0 ? true : false} key={key} value={sheetID}
            onClick={() => handleSheetChange(sheetID)}>{sheetName}</MenuItem>));
    }
    const handleSheetChange = (sheetID) => {
        try {
            setOpen(false)

            window.window.Cortona3DSolo.app.ipc.setCurrentSheet(sheetID, true);
            window.updatePrint()
            window.handleShowPart()
            window.window.Cortona3DSolo.app.didSetSelectedContext()
        } catch (err) {
        }
    }

    return (
        <>
            <ToggleButton
                role="btnSideBar1"
                value="multiView"
                selected={open}
                onClick={handleClick}>
                <MenuIcon />
            </ToggleButton>

            <Menu className='ContextMenuView'
                open={open} anchorEl={anchorEl}
                onClose={window.setCloseMenuView}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: CustomTheme.anchor,
                }} />
        </>
    );
}
