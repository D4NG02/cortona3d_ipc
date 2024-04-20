import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import PartTable from '../Components/PartTable';
import { color } from '../CustomStyle';
import DetailTable from '../Components/DetailTable';

export default function Manual() {
    const [changeTab, setChangeTab] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setChangeTab(newValue);
        console.log('Tab: ' +newValue)
    };

    return (
        <Box sx={{ height: '100%', display: 'grid', gridTemplateRows: 'max-content auto' }} className="manual">
            <AppBar position="static">
                <Tabs className="manual-tabs" value={changeTab} onChange={handleChangeTab} variant="fullWidth">
                    <Tab label={window.partsTab} id="tab-part" aria-controls='Part Container' />
                    <Tab label={window.detailsTab} id="tab-detail" aria-controls='Part Container' />
                </Tabs>
            </AppBar>

            <Box bgcolor={color.water} className="manual-container">
                <PartTable hidden={changeTab} />
                <DetailTable hidden={changeTab} />
            </Box>
        </Box>
    );
}
