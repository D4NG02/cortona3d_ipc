import React from "react";

import { ToggleButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

export default function BtnPrintOutput() {
  const handlePrint = () => {
    // Close other button
    window.MenuOnce()

    let currentDisplay
    let isDisplay = window.Cortona3DSolo.app.ui.isCanvasVisible()

    window.$('table#dpl-table').clone().appendTo('div.printPage-part');
    window.$('div.detailClone > table.dpl-table > colgroup > col:nth-child(1)').attr("width", "8%");
    window.$('div.detailClone > table.dpl-table > colgroup > col:nth-child(2)').attr("width", "28%");
    window.$('div.detailClone > table.dpl-table > colgroup > col:nth-child(3)').attr("width", "42%");
    window.$('div.detailClone > table.dpl-table > colgroup > col:nth-child(4)').attr("width", "8%");
    window.$('div.detailClone > table.dpl-table > colgroup > col:nth-child(5)').attr("width", "24%");

    window.print();
    window.$('div.printPage-part > table#dpl-table').remove();
    
    // solve animation not display after print
    window.Cortona3DSolo.app.ipc.toggleDrawingDisplayMode();
    currentDisplay = window.Cortona3DSolo.app.ui.isCanvasVisible()
    if(currentDisplay !== isDisplay){
      window.Cortona3DSolo.app.ipc.toggleDrawingDisplayMode();
    }
  };

  return (
    <ToggleButton role="btnSideBar1" value="BtnPrint" onClick={handlePrint}>
      <PrintIcon />
    </ToggleButton>
  );
}
