import React from 'react';
import { Box } from '@mui/material';

import BtnMenuView from '../Components/SideBar/BtnMenuView';
import BtnMultiView from '../Components/SideBar/BtnMultiView';
import Btn3DView from '../Components/SideBar/Btn3DView';
import BtnManual from '../Components/SideBar/BtnManual';
import BtnPartShow from '../Components/SideBar/BtnPartShow';
import BtnPartHide from '../Components/SideBar/BtnPartHide';
import BtnTransparent from '../Components/SideBar/BtnTransparent';
import BtnToggleImage from '../Components/SideBar/BtnToggleImage';
import BtnResetAll from '../Components/SideBar/BtnResetAll';
import BtnPrintOutput from '../Components/SideBar/BtnPrintOutput';

const SidebarStyle = {
    overflowY: 'auto',
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
}

export default function SideBar() {
    return (
        <Box sx={SidebarStyle}>
            <BtnMenuView />
            <BtnMultiView />
            <Btn3DView />
            <BtnManual />
            <BtnPartShow />
            <BtnPartHide />
            <BtnTransparent />
            <BtnToggleImage />
            <BtnResetAll />
            <BtnPrintOutput />
        </Box>
    );
}
