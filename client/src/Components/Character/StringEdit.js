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
                <Dialog onClose={() => handleClose(false)} open={open}>
                    <DialogTitle>Edit</DialogTitle>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField id="outlined-basic" label={title} onChange={(e) => setDialogString(e.target.value)} defaultValue={string} />
                        </Grid>
                        <Grid item>
                            <ButtonGroup size="large" orientation="horizontal" variant="contained">
                                <Button onClick={() => handleClose(true)}>Save Changes</Button>
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
