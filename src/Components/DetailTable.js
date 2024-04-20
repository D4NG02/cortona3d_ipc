import React, { useState } from 'react';
import { Box, Typography, TableContainer, Table, TableBody } from '@mui/material';

import DetailRow from './DetailRow';

export default function DetailTable(props) {
    const [titleData, setTitleData] = useState('')
    const [sectionData, setSectionData] = useState('')
    const [docNoData, setDocNoData] = useState('')
    const [partNoData, setPartNoData] = useState('')
    const [operationData, setOperationData] = useState('')
    const [modelData, setModelData] = useState('')
    const [modelYearData, setModelYearData] = useState('')
    const [engineData, setEngineData] = useState('')
    const [transmissionData, setTransmissionData] = useState('')
    const [driveTypeData, setDriveTypeData] = useState('')
    const [bodyData, setBodyData] = useState('')
    const [regionData, setRegionData] = useState('')
    const [vinFromData, setVinFromData] = useState('')
    const [vinToData, setVinToData] = useState('')
    const [createdDateData, setCreatedDateData] = useState('')
    const [revisionDateData, setRevisionDateData] = useState('')
    const [revisionData, setRevisionData] = useState('')


    window.setDetailTable = function setDetailTable (interactivity) {
        setTitleData(interactivity.getProjectMetadata()["TITLE"])
        setSectionData(interactivity.getProjectMetadata()["_6909F78148EC441F9C885A633128042F"])
        setDocNoData(interactivity.getProjectMetadata()["TOPIC_ID"])
        setPartNoData(interactivity.getProjectMetadata()["_D0CB03F4CB464CE9B5868F0E1EF6D04E"])
        setOperationData(interactivity.getProjectMetadata()["_60D40144FE204B6AA95C339DE471AC7F"])
        setModelData(interactivity.getProjectMetadata()["_AE0FF824ACAF49E99AC50C8404A2ED97"])
        setModelYearData(interactivity.getProjectMetadata()["_46CB3D37B61E40B4B945721C1399A139"])
        setEngineData(interactivity.getProjectMetadata()["_9C20F281833A476A874133F435679CBF"])
        setTransmissionData(interactivity.getProjectMetadata()["_012E5F47CFBB4D86B4AE50EF3A1B0706"])
        setDriveTypeData(interactivity.getProjectMetadata()["_54BC13BF6EE045CBB3C697D494EBA09B"])
        setBodyData(interactivity.getProjectMetadata()["_00CE3CA4F75C4DB3844BE583D75E6329"])
        setRegionData(interactivity.getProjectMetadata()["_E1EE426BF10F481E875603842A1194F9"])
        setVinFromData(interactivity.getProjectMetadata()["_FDC4E19636904C22B22C3C5164282605"])
        setVinToData(interactivity.getProjectMetadata()["_9BF5891E2CA84E5E8A86D3FAD2C98399"])
        setCreatedDateData(interactivity.getProjectMetadata()["_E1CD9B386FC44B109121BAC3D3F3D8F6"])
        setRevisionDateData(interactivity.getProjectMetadata()["_5D663E0622A1472891FF6373AE63F50D"])
        setRevisionData(interactivity.getProjectMetadata()["_F5CB2C8BA28A40C98560EFC3EB7A60DD"])

        
        if (window.docLanguage == "ar-SA") {
            var createdDate, revisionDate;
            revisionDate = revisionDateData.substring(0, revisionDateData.indexOf('T')).replace("-", "/").replace("-", "/");
            createdDate = createdDateData.substring(0, createdDateData.indexOf('T')).replace("-", "/").replace("-", "/");
            
            setCreatedDateData(createdDate)
            setRevisionDateData(revisionDate)
        }
    }

    var hourVariable;
    if (window.repairTime > 1) {
        hourVariable = window.hoursText;
    } else {
        hourVariable = window.hourText;
    }

    var rTimes;
    if (window.repairTime !== 0.0) {
        rTimes =  window.repairTime;
        if (window.docLanguage === 'ar-SA') {
            rTimes =  ConvertToArabicNumbers(window.repairTime);
        }
    } else {
        rTimes = '0.0';
        if (window.docLanguage === 'ar-SA') {
            rTimes = '۰.۰';
        }
    }
    
    function ConvertToArabicNumbers(num){
        num = String(num);
        var id= ['۰', '۱', '۲', '۳', '٤', '٥', '٦', '۷', '۸', '۹'];
        num = num.replace(/[0-9]/g, function(w){ return id[+w] });

        const arabicRes = [];
        const length = num.length - 1;
         
        for(let i = length; i >= 0; i--) {
            arabicRes.push(num[i]);
        }
         
        return arabicRes.join('');
    }

    return (
        <Box value="Detail Container" hidden={props.hidden===1? false : true}>
            <Typography component="div" variant='body1'>
                <TableContainer>
                    <Table className='justify'>
                        <TableBody>
                            { titleData && <DetailRow cell={2} header={window.titleHeader} text1={titleData} /> }
                            { sectionData && <DetailRow cell={2} header={window.sectionHeader} text1={sectionData} />}
                            { docNoData && <DetailRow cell={2} header={window.docNoHeader} text1={docNoData} /> }
                            { (partNoData && partNoData === 'XXX-XXXX-XXXXXX') && <DetailRow cell={2} header={window.partNumberHeader} text1={partNoData} /> }
                            { operationData && <DetailRow cell={2} header={window.operationHeader} text1={operationData} /> }
                            { modelData && <DetailRow cell={2} header={window.modelHeader} text1={modelData} /> } 
                            { modelYearData && <DetailRow cell={2} header={window.modelYearHeader} text1={modelYearData} /> } 
                            { engineData && <DetailRow cell={2} header={window.engineHeader} text1={engineData} /> }
                            { (transmissionData && transmissionData === 'Common') && <DetailRow cell={2} header={window.transmissionHeader} text1={transmissionData} /> }
                            { (driveTypeData && driveTypeData === 'Common') && <DetailRow cell={2} header={window.driveTypeHeader} text1={driveTypeData} /> }
                            { (bodyData && bodyData === 'Common') && <DetailRow cell={2} header={window.bodyHeader} text1={bodyData} /> }
                            { (regionData && regionData === 'Common') && <DetailRow cell={2} header={window.regionHeader} text1={regionData} /> }
                            { (vinFromData && vinFromData === 'XXXXXXXXXXXXXXXXX') && <DetailRow cell={2} header={window.vinFromHeader} text1={vinFromData} /> }
                            { (vinToData && vinToData === 'XXXXXXXXXXXXXXXXX') && <DetailRow cell={2} header={window.vinToHeader} text1={vinToData} /> }
                            
                            <DetailRow cell='revision' text1={createdDateData} text2={revisionDateData} text3={revisionData} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </Typography>
        </Box>
    );
}
