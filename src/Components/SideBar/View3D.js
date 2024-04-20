import React from 'react';
import { ToggleButton } from '@mui/material';

import Aim from "../../Assets/aim.svg";
import Cartesian from "../../Assets/cartesian.svg";
import FullScreen from "../../Assets/fullscreen.svg";
import ObjectAlignment from "../../Assets/objectalignment.svg";

export default function View3D() {
    const handleFullScreen = () => {
        if (document.fullscreenElement === null) {
            window.openFullscreen();
        } else {
            window.closeFullscreen();
        }
    }

    const handleSetCenter = () => {
        // Click on 3D object
        if(window.selectObject){
            window.Cortona3DSolo.app.setRotationCenterVisibility(true);
            window.Cortona3DSolo.app.setRotationCenterToSelectedObjects(true);
        }
    }
    const handleAlignHorizon = () => {
        window.Cortona3DSolo.app.alignHorizon(true);
    }
    const handleCartesian = () => {
        if(window.Cortona3DSolo.app.isRotationCenterVisible() === true){
            window.Cortona3DSolo.app.setRotationCenterVisibility(false);
            window.Cortona3DSolo.app.setRotationCenterToSelectedObjects(false);
        }else{
            window.Cortona3DSolo.app.setRotationCenterVisibility(true);
            window.Cortona3DSolo.app.setRotationCenterToSelectedObjects(true);
        }
    }
    const view3D = (btnID) => {
        console.log("btnTag " + btnID);

        if (btnID === "SetCenter"){
            handleSetCenter();
        } else if (btnID === "Cartesian"){
            handleCartesian();
        } else if (btnID === "FullScreen"){
            handleFullScreen();
        } else if (btnID === "AlignHorizon"){
            handleAlignHorizon();
        }
    }

    return (
        <>
            <ToggleButton id="SetCenter" role="btnSideBar2" title="Set Center" value="Set Center" onClick={(btnID) => view3D("SetCenter") }>
                <img alt='Aim icon' src={window.baseUri + Aim} />
            </ToggleButton>
            <ToggleButton id="Cartesian" role="btnSideBar2" title="Show/Hide Horizon Center" value="Show/Hide Horizon Center" onClick={(btnID) => view3D("Cartesian") }>
                <img alt='Cartesian icon' src={window.baseUri + Cartesian} />
            </ToggleButton>
            <ToggleButton id="FullScreen" role="btnSideBar2" title="Full Screen" value="Full Screen" onClick={(btnID) => view3D("FullScreen") }>
                <img alt='FullScreen icon' src={window.baseUri + FullScreen} />
            </ToggleButton>
            <ToggleButton id="AlignHorizon" role="btnSideBar2" title="Align Horizon" value="Align Horizon" onClick={(btnID) => view3D("AlignHorizon") }>
                <img alt='Object Alignment icon' src={window.baseUri + ObjectAlignment} />
            </ToggleButton>
        </>
    );
}
