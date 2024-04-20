import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';

import Front_View from "../../Assets/Front_View.svg";
import Back_View from "../../Assets/Back_View.svg";
import Left_Side_View from "../../Assets/Left_Side_View.svg";
import Right_Side_View from "../../Assets/Right_Side_View.svg";
import Top_View from "../../Assets/Top_View.svg";
import Bottom_View from "../../Assets/Bottom_View.svg";
import View_Multi from "../../Assets/cube.svg";

export default function MultiView() {
    const [selected, setSelected] = useState('');

    const viewPlan = (side) => {
        console.log('ViewMulti ' + side)
        setSelected(side)
        window.Cortona3DSolo.app.jumpToStandardView(side, true)
    };

    return (
        <>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'front' ? true : false}
                onClick={(side) => viewPlan("front")}
                title="Front View" value="Front View">
                <img src={window.baseUri + Front_View} alt='Front View' />
            </ToggleButton>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'back' ? true : false}
                onClick={(side) => viewPlan("back")}
                title="Back View" value="Back View">
                <img src={window.baseUri + Back_View} alt='Back View' />
            </ToggleButton>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'left' ? true : false}
                onClick={(side) => viewPlan("left")}
                title="Left View" value="Left View">
                <img src={window.baseUri + Left_Side_View} alt='Left View' />
            </ToggleButton>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'right' ? true : false}
                onClick={(side) => viewPlan("right")}
                title="Right View" value="Right View">
                <img src={window.baseUri + Right_Side_View} alt='Right View' />
            </ToggleButton>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'top' ? true : false}
                onClick={(side) => viewPlan("top")}
                title="Top View" value="Top View">
                <img src={window.baseUri + Top_View} alt='Top View' />
            </ToggleButton>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'bottom' ? true : false}
                onClick={(side) => viewPlan("bottom")}
                title="Bottom View" value="Bottom View">
                <img src={window.baseUri + Bottom_View} alt='Bottom View' />
            </ToggleButton>
            <ToggleButton role="btnSideBar2"
                selected={selected === 'isometric' ? true : false}
                onClick={(side) => viewPlan("isometric")}
                title="Isometric" value="Isometric">
                <img src={window.baseUri + View_Multi} alt='Isometric View' />
            </ToggleButton>
        </>
    );
}
