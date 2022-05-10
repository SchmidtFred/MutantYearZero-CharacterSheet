import React, { useState, useEffect } from 'react';
import { Dialog, Grid, DialogTitle, Button, ButtonGroup, TextField } from "@mui/material";

export default {
    render: {
        StringDialog({ title, _string, open, onClose, openSetter, stringSetter }) {
            const [string, setDialogString] = useState("");

            useEffect(() => {
                setDialogString(_string);
            }, [_string]);

            const handleClose = (save) => {
                onClose(openSetter, save, stringSetter, string);
            };

            return (
                <Dialog onClose={() => handleClose(false)} open={open} fullWidth>
                    <DialogTitle textAlign="center">Edit</DialogTitle>
                    <Grid container direction="column" spacing={2} alignItems='center' >
                        <Grid item sx={{width: "90%", display: 'flex', justifyContent: "center"}}>
                            <TextField id="outlined-basic" color="secondary" variant="filled" label={title} onChange={(e) => setDialogString(e.target.value)} defaultValue={string} sx={{width: "inherit"}} />
                        </Grid>
                        <Grid item>
                            <ButtonGroup size="large" orientation="horizontal" variant="contained">
                                <Button onClick={() => handleClose(true)}>Submit</Button>
                                <Button onClick={() => handleClose(false)}>Cancel</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Dialog>
            )
        }
    },
    handlers: {
        handleOpen(openState, setOpenState) {
            if (!openState) {
                setOpenState(true);
            }
        },
        
        handleClose(setOpenState, save, stringSetter, newString) {
            if (save) {
                stringSetter(newString);
            }
            setOpenState(false);
        }
    }
}
