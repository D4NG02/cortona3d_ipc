import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PartTable(props) {
    return (
        <Box value="Part Container" hidden={props.hidden===0? false : true}>
            <Typography component="div" variant='body1'>
                <Box id="part-table-container"></Box>
            </Typography>
        </Box>
    );
}
