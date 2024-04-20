import React, { useState } from 'react';
import { Box } from '@mui/material';

import Logo from "../Assets/cortona3d.jpg";
import { CustomTheme } from '../CustomStyle';
import Manual from './Manual';
import SideBar from './SideBar';

const MainStyle = {
    height: '100%',
    display: 'grid',
    [CustomTheme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'max-content auto'
    },
    [CustomTheme.breakpoints.up('md')]: {
        gridTemplateColumns: 'max-content auto'
    },
    [CustomTheme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'max-content auto'
    },
}
const ManualOnStyle = {
    width: '100%',
    display: 'grid',
    [CustomTheme.breakpoints.down('sm')]: {
        gridTemplateRows: 'auto 36vw'
    },
    [CustomTheme.breakpoints.up('md')]: {
        gridTemplateColumns: 'auto 36vw'
    },
}
const ManualOffStyle = {
    width: '100%',
}
const AnimationStyle = {
    position: 'relative',
    height: '100%',

    '& > canvas': {
        // position: 'relative',
    },
    '& > .cortona3dsolo-svg': {
        // position: 'relative',
    },
    '& > .tiramisu-panel-group': {
        display: 'none'
    },

    '& > img': {
        zIndex: 1,
        height: 'auto',
        position: 'absolute',
        backgroundColor: "transparent",
        top: 30,
        right: window.docLanguage === "ar-SA" ? 'unset' : 30,
        left: window.docLanguage === "ar-SA" ? 30 : 'unset',
        [CustomTheme.breakpoints.down('sm')]: {
            width: '120px'
        },
        [CustomTheme.breakpoints.between('sm', 'md')]: {
            width: '150px',
        },
        [CustomTheme.breakpoints.up('md')]: {
            width: '180px',
        },
    }
}

export default function Page() {
    const [isContainer, setContainer] = useState(true);
    window.setDisplayInfo = (input) => {
        setContainer(!isContainer);
    }

    return (
        <Box sx={MainStyle} component='div'>
            <SideBar />
            <Box sx={isContainer ? ManualOnStyle : ManualOffStyle}>
                <Box id="MainDiv" sx={AnimationStyle}>
                    <img src={window.baseUri + Logo} alt="Company Logo" />
                </Box>
                <Box style={{ display: isContainer ? 'block' : 'none' }}>
                    <Manual />
                </Box>
            </Box>
        </Box>
    );
}
