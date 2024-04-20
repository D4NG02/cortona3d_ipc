import React, { useState } from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import Logo from "./Assets/cortona3d.jpg";
import { CustomComponent } from './CustomStyle';

export default function Print() {
    const [modelData, setModelData] = useState('')
    const [modelYearData, setModelYearData] = useState('')
    const [engineData, setEngineData] = useState('')
    const [transmissionData, setTransmissionData] = useState('')
    const [lhdRhdData, setLhdRhdData] = useState('')
    const [bodyData, setBodyData] = useState('')
    const [titleData, setTitleData] = useState('')
    window.setPrintHeader = function setPrintHeader (interactivity) {
        setModelData(interactivity.getProjectMetadata()["_AE0FF824ACAF49E99AC50C8404A2ED97"])
        setModelYearData(interactivity.getProjectMetadata()["_46CB3D37B61E40B4B945721C1399A139"] +',')
        setEngineData(interactivity.getProjectMetadata()["_9C20F281833A476A874133F435679CBF"] +',')
        setTransmissionData(interactivity.getProjectMetadata()["_012E5F47CFBB4D86B4AE50EF3A1B0706"] +',')
        setLhdRhdData(interactivity.getProjectMetadata()["_54BC13BF6EE045CBB3C697D494EBA09B"] +',')
        setBodyData(interactivity.getProjectMetadata()["_00CE3CA4F75C4DB3844BE583D75E6329"] +',')
        setTitleData(interactivity.getProjectMetadata()["TITLE"])
    }

    return (
        <ThemeProvider theme={CustomComponent}>
            <Typography className="printPage" component="div" variant='div'>
                <table className="printHeader">
                    <tbody>
                        <tr>
                            <td rowSpan="0">
                                <img src={window.baseUri + Logo} alt="Ineos Logo" className="headerLogo" />
                            </td>
                            <td>{modelData}</td>
                        </tr>
                        <tr>
                            <td>{engineData} {modelYearData} {transmissionData} {lhdRhdData} {bodyData}</td>
                        </tr>
                        <tr>
                            <td>{titleData}</td>
                        </tr>
                    </tbody>
                </table>
                <Box className="printPage-part">
                    <h1 className="part-title">{window.partsTab}</h1>
                </Box>
            </Typography>
        </ThemeProvider>
    );
}
