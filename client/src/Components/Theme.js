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
                    backgroundColor: "#D08C42",
                    marginBottom: '1rem',
                    borderBottom: '#673f1e solid 2px'
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
        }
    }
});