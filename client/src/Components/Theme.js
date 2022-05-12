import { createTheme } from '@mui/material/styles';
import { palette } from '@mui/system';

export const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
        main: '#D08C42',
        light: '#ead2b3',
        dark: '#673f1e',
        },
        secondary: {
        main: '#673f1e',
        },
        background: {
        default: '#dee4ea',
        paper: '#ead2b3',
        },
        success: {
            main: '#673f1e'
        }
    },
    typography: {
        fontFamily: 'Nova Flat',
    },
    props: {
        MuiAppBar: {
        color: 'default',
        },
    },
    components: {
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    backgroundColor: '#673f1e',
                    marginBottom: '1rem',
                    color: 'white'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "&:hover": {
                        color: 'white'
                    }
                }
            }
        },
        MuiButtonGroup: {
            styleOverrides: {
                root: {
                    boxShadow: '1px 1px #673f1e, -1px -1px #673f1e, 1px -1px #673f1e, -1px 1px #673f1e',
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #673f1e'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: 'black',
                    "&.Mui-selected": {
                        color: 'white',
                        backgroundColor: '#673f1e'
                    },
                },
            }
        },
        MuiTabs: {
            styleOverrides: {
                indicator: {
                    backgroundColor: '#ead2b3'
                }
            }
        },
    }
});