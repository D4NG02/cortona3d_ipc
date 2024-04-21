import React, { useState } from 'react';

import { Box, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { color } from '../CustomStyle';

export default function Loading() {
    const [load, setLoading] = useState(true);

    window.setDisplayLoading = (input) => {
        setLoading(input);
    }

    return (
        <Dialog fullScreen open={load}>
            <DialogContent>
                <Box
                    sx={{
                        top: '50%',
                        left: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'absolute',
                        color: color.primary,
                        flexDirection: 'column',
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <Typography className='loading-title' variant='h5' component='h5'>{window.loading_text}</Typography>
                    <CircularProgress size={100} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}
