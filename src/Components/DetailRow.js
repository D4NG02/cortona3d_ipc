import React from 'react';

import { TableCell, TableRow } from '@mui/material';

export default function DetailRow(props) {

    return (
        <>
            { props.cell===2 && <>
                <TableRow>
                    <TableCell component="th" variant="head">{props.header}</TableCell>
                    <TableCell sx={props.bold? {fontWeight: 'bold'}: {}} colSpan={2}>{props.text1}</TableCell> 
                </TableRow>
            </> }

            { props.cell===3 && <>
                <TableRow>
                    <TableCell component="th" variant="head">{props.header}</TableCell>
                    <TableCell>{props.text1}</TableCell>
                    <TableCell>{props.text2}</TableCell>
                </TableRow>
            </> }

            { props.cell==='revision' && <>
                {props.text1 &&
                    <TableRow>
                        <TableCell component="th" variant="head" rowSpan={0}>{window.revisionsHeader}</TableCell>
                        <TableCell>{window.createdHeader}</TableCell>
                        <TableCell>{props.text1}</TableCell>
                    </TableRow>
                }
                {props.text2 && props.text2!==props.text1 &&
                    <TableRow>
                        <TableCell>{window.revisedHeader}</TableCell>
                        <TableCell>{props.text2}</TableCell>
                    </TableRow>
                }
                {props.text3 && 
                    <TableRow>
                        <TableCell>{window.commentsHeader}</TableCell>
                        <TableCell>{props.text3}</TableCell>
                    </TableRow>
                }
            </> }
        </>
    );
}
