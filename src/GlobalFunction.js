import React from 'react';

export default function GlobalFunction() {
    window.globalSheetChange = function globalSheetChange(sheetID) {
        try {
            window.Cortona3DSolo.app.ipc.setCurrentSheet(sheetID, true);
            window.updatePrint()
            window.handleShowPart()
            window.Cortona3DSolo.app.didSetSelectedContext()
        } catch (err) {
        }
    }

    // Sidebar popup
    window.MenuOnce = () => {
        window.setCloseMenuView()
        window.setDisplayMultiView(false)
        window.setDisplay3DView(false)
        window.setDisplayTransparent(false)
    };

    return (<></>);
}
