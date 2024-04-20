import { createTheme } from "@mui/material"

const color = {
    flagBlue: '#00152C',
    brigadeRed: '#B61615',
    water: '#BAD0DB',
    turf: '#91954C',
    ice: '#F7F4E5',
    sand: '#EDDBB4',
    mud: '#C18556',
    gravel: '#9D9D9C',

    hover: '#99BCCE',

    white: '#FFF',
    black: '#252525',
}

const CustomTheme = createTheme({
    direction: window.docLanguage === "ar-SA" ? "rtl" : "ltr",
    anchor: window.docLanguage === "ar-SA" ? "right" : "left",
    OpenSans: "Open Sans",
    Oswald: "Oswald",
    Arial: "Arial",
    font_family: window.docLanguage === "ar-SA" ? 'Arial' : 'Open Sans',
    breakpoints: {
        values: {
            xs: 425,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1920,
        },
    },
})

const CustomComponent = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: CustomTheme.font_family,

                    '&.printPage': {
                        fontSize: '4mm',
                        letterSpacing: '0.6px',
                        fontFamily: CustomTheme.font_family,
                        
                        '& div.printPage-part': {
                            padding: '0 5mm',
                        },
                        '& h1.part-title': {
                            fontSize: 'inherit',
                            fontFamily: 'inherit',
                            margin: 'unset',
                            paddingTop: '5mm',
                            paddingBottom: '2mm',
                            fontWeight: 'bold',
                        },
                        '& img.headerLogo': {
                            width: '46mm'
                        },
                        '& table': {
                            '&.printHeader': {
                                borderCollapse: 'collapse',
                                width: '100%',
                                '& td': {
                                    textAlign: 'center',
                                    fontSize: '5mm',
                                    padding: '2mm 4mm',
                                    color: color.flagBlue,
                                    border: '1px solid ' +color.flagBlue,
                                    borderTopWidth: 0,
                                },
                                '& td:first-of-type': {
                                    borderInlineStartWidth: 0,
                                },
                                '& td:last-of-type': {
                                    borderInlineEndWidth: 0,
                                }
                            },

                            '&.dpl-table': {
                                '& thead': {
                                    '& td': {
                                        padding: '2mm',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: 'inherit',
                                        background: 'unset',
                                        fontFamily: 'inherit',
                                        color: color.flagBlue,
                                        border: '1px solid ' +color.flagBlue,
                                    },
                                },
                                '& tbody': {
                                    '& td': {
                                        padding: '2mm',
                                        fontSize: 'inherit',
                                        background: 'unset',
                                        fontFamily: 'inherit',
                                        color: color.flagBlue,
                                        border: '1px solid ' +color.flagBlue,
                                    },
                                    '& td:is(:nth-of-type(1), :nth-of-type(4))': {
                                        textAlign: 'center',
                                    },
                                    '& tr.warning > td:last-child': {
                                        fontWeight: 'bold',
                                        color: color.brigadeRed,
                                    },
                                },
                            }
                        },
                    },
                    
                },
                body1: {
                    overflowY: 'auto',
                    fontFamily: CustomTheme.font_family,
                    [CustomTheme.breakpoints.down('sm')]: {
                        margin: 12,
                        fontSize: 10,
                        maxHeight: '34vh'
                    },
                    [CustomTheme.breakpoints.down('md')]: {
                        margin: 12,
                        fontSize: 10,
                        maxHeight: '28vh'
                    },
                    [CustomTheme.breakpoints.up('md')]: {
                        margin: 20,
                        fontSize: 14,
                        maxHeight: 'calc(94vh - 50px)'
                    },
                    
                    // table 
                    '& table.dpl-table': {
                        border: 'unset',

                        '& thead': {
                            fontSize: 'inherit',

                            '& td': {
                                fontSize: 'inherit',
                                fontWeight: 'bold',
                                color: color.white,
                                background: 'unset',
                                textAlign: 'center',
                                backgroundColor: color.flagBlue,
                                fontFamily: CustomTheme.font_family,
                                
                                [CustomTheme.breakpoints.down('sm')]: {
                                    padding: '6px 8px',
                                    border: '3px solid ' +color.water,
                                },
                                [CustomTheme.breakpoints.up('sm')]: {
                                    padding: '8px 12px',
                                    border: '5px solid ' +color.water,
                                },
                            },
                        },

                        '& tbody': {
                            fontSize: 'inherit',
                            '& td': {
                                fontSize: 'inherit',
                                color: color.flagBlue,
                                fontFamily: CustomTheme.font_family,
                                
                                [CustomTheme.breakpoints.down('sm')]: {
                                    padding: '6px 8px',
                                    border: '3px solid ' +color.water,
                                },
                                [CustomTheme.breakpoints.up('sm')]: {
                                    padding: '8px 12px',
                                    border: '5px solid ' +color.water,
                                },
                            },
                            '& td:is(:nth-of-type(1), :nth-of-type(4))': {
                                textAlign: 'center',
                            },

                            '& tr > td': {
                                backgroundColor: color.white,
                            },
                            '& tr.selected': {
                                background: 'unset'
                            },
                            '& tr.selected > td': {
                                backgroundColor: color.mud,
                            },
                            '& tr.warning > td:last-child': {
                                fontWeight: 'bold',
                                color: color.brigadeRed,
                            },
                            '& tr:hover > td': {
                                backgroundColor: color.hover,
                            },
                            '& tr.hover > td': {
                                backgroundColor: color.hover,
                            },
                        },

                    },

                    '& pre': {
                        margin: 'unset',
                        fontFamily: 'inherit',
                    }
                },
                body2: {
                    fontFamily: CustomTheme.font_family,
                    
                    '&:not(.ContextMenu)': {
                        [CustomTheme.breakpoints.down('sm')]: {
                            margin: 12,
                            fontSize: 10,
                        },
                        [CustomTheme.breakpoints.down('md')]: {
                            margin: 12,
                            fontSize: 10,
                        },
                        [CustomTheme.breakpoints.up('md')]: {
                            margin: 20,
                            fontSize: 14,
                        },
                    },
                },
                h5: {
                    '&.ContextMenuItem ': {
                        fontSize: '1rem',
                        padding: '8px 16px',
                        '&:hover ': {
                            color: color.flagBlue,
                            backgroundColor: color.water,
                        },
                    },
                    '&.loading-title': {
                        fontSize: 36,
                        paddingBottom: 12,
                        fontWeight: 'bolder',
                    },
                    '&.table-title': {
                        fontSize: 'inherit',
                        fontWeight: 'bold',
                        padding: '0 5px',
                    }
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    position: 'relative'
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: '500',
                    lineHeight: 'normal',
                    textTransform: 'capitalize',
                    minWidth: 0,
                    borderRadius: 0,
                    fontFamily: CustomTheme.font_family,
                    color: color.flagBlue,
                    padding: '0 8px',

                    '&.Mui-disabled': {
                        color: color.flagBlue,
                        cursor: 'default',
                        fontWeight: 'bold',
                    }
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: 'unset',
                    borderRadius: 'unset',
                    fontFamily: CustomTheme.font_family,
                    '&.Mui-disabled': {
                        border: 'unset',
                        opacity: '0.5',
                    },

                    '& img': {
                        transform: "scale(0.8)",
                        [CustomTheme.breakpoints.down('sm')]: {
                            height: 25,
                            width: 25,
                        },
                        [CustomTheme.breakpoints.up('md')]: {
                            height: 35,
                            width: 35,
                        },
                        [CustomTheme.breakpoints.up('lg')]: {
                            height: 50,
                            width: 50,
                        },
                    },
                    '& svg': {
                        transform: CustomTheme.direction==='ltr'? 'scaleX(1)':'scaleX(-1)',
                        
                        [CustomTheme.breakpoints.down('sm')]: {
                            height: 25,
                            width: 25,
                        },
                        [CustomTheme.breakpoints.up('md')]: {
                            height: 35,
                            width: 35,
                        },
                        [CustomTheme.breakpoints.up('lg')]: {
                            height: 50,
                            width: 50,
                        },
                    },
                    
                    '&[role="btnSideBar1"]': {
                        padding: '6px 8px',
                        color: color.flagBlue,
                        backgroundColor: color.white,
                        '& img': {
                            filter: "brightness(1) invert(0)",
                        },
                        '&:hover': {
                            color: color.white,
                            backgroundColor: color.flagBlue,
                            '& img': {
                                filter: "brightness(0) invert(1)",
                            },
                        },
                        '&.Mui-selected': {
                            color: color.white,
                            backgroundColor: color.flagBlue,
                            '& img': {
                                filter: "brightness(0) invert(1)",
                            },
                            '&:hover': {
                                color: color.white,
                                backgroundColor: color.flagBlue,
                            },
                        },
                    },
                    
                    '&[role="btnSideBar2"]': {
                        padding: '6px',
                        color: color.white,
                        backgroundColor: color.flagBlue,
                        '& img': {
                            filter: "brightness(0) invert(1)",
                        },
                        '&:hover': {
                            color: color.white,
                            backgroundColor: color.water,
                        },
                        '&.Mui-selected': {
                            cursor: 'unset',
                            color: color.white,
                            backgroundColor: color.water,
                            '&:hover': {
                                color: color.white,
                                backgroundColor: color.water,
                            },
                        },
                    },
                },
            },
        },

        // Loading
        MuiCircularProgress: {
            styleOverrides: {
                root: {
                    color: 'inherit'
                }
            },
        },

        // Tab
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'unset',
                    backgroundColor: color.water,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                flexContainer: {
                    gap: 5,
                    flexWrap: 'wrap',
                    borderBottom: '5px solid',
                    backgroundColor: color.white
                },
                indicator : {
                    display: 'none',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    padding: 8,
                    fontSize: 14,
                    fontWeight: '500',
                    maxWidth: 'unset',
                    color: color.flagBlue,
                    minWidth: '30%',
                    textTransform: "capitalize",
                    backgroundColor: color.water,
                    fontFamily: CustomTheme.font_family,
                    '&.Mui-selected': {
                        fontWeight: 'bold',
                        color: color.white,
                        backgroundColor: color.flagBlue,
                    },
                    
                    [CustomTheme.breakpoints.down('sm')]: {
                        padding: '4px 8px',
                        fontSize: 12,
                        minHeight: '40px',
                    },
                    [CustomTheme.breakpoints.between('sm', 'md')]: {
                        padding: '5px 10px',
                        fontSize: 13,
                    },
                    [CustomTheme.breakpoints.up('md')]: {
                        padding: '6px 12px',
                        fontSize: 14,
                    },
                },
                textColorInherit: {
                    color: color.flagBlue,
                    opacity: 'unset',
                    '&.Mui-disabled': {
                        display: 'none'
                    }
                }
            },
        },

        // slider
        MuiSlider: {
            styleOverrides: {
                root: {
                },
                colorPrimary: {
                    color: color.flagBlue,
                },
                colorSecondary: {
                    color: color.white
                },
    
                track: {
                    height: 6,
                    borderRadius: 3,
                },
                rail: {
                    height: 6,
                    opacity: '0.4',
                    borderRadius: 3,
                },
                thumb: {
                    height: 14,
                    width: 14,
                },
            },
        },

        // Table
        MuiTableCell: {
            styleOverrides: {
                root: {
                    minWidth: '33.33%',
                    fontSize: 'inherit',
                    textAlign: 'justify',
                    fontFamily: CustomTheme.font_family,
                },

                head: {
                    fontWeight: 'bold',
                    color: color.white,
                    backgroundColor: color.flagBlue,
                    
                    [CustomTheme.breakpoints.down('sm')]: {
                        padding: '6px 8px',
                        border: '3px solid ' +color.water,
                    },
                    [CustomTheme.breakpoints.up('sm')]: {
                        padding: '8px 12px',
                        border: '5px solid ' +color.water,
                    },
                },
                body: {
                    color: color.flagBlue,
                    backgroundColor: color.white,
                    
                    [CustomTheme.breakpoints.down('sm')]: {
                        padding: '6px 8px',
                        border: '3px solid ' +color.water,
                    },
                    [CustomTheme.breakpoints.up('sm')]: {
                        padding: '8px 12px',
                        border: '5px solid ' +color.water,
                    },
                },
            },
        },

        // Menu
        MuiMenu: {
            styleOverrides: {
                root: {
                    textAlign: 'justify',
                    fontFamily: CustomTheme.font_family,

                    '& h5.ContextMenuItem-view': {
                        margin: 'unset',
                        cursor: 'pointer',
                        fontWeight: 'normal',

                        [CustomTheme.breakpoints.down('md')]: {
                            padding: '4px 10px',
                            fontSize: 12,
                        },
                        [CustomTheme.breakpoints.up('md')]: {
                            padding: '6px 16px',
                            fontSize: 16,
                        },

                        '&.Mui-selected': {
                            cursor: 'default',
                            color: color.white,
                            backgroundColor: color.flagBlue,
                        },
                        '&:hover': {
                            color: color.flagBlue,
                            backgroundColor: color.water,
                        },
                    }
                },
            },
        },
    },
})


export { color, CustomTheme, CustomComponent }