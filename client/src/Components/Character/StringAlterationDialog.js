import React, { useState, useEffect } from 'react';
import { Dialog, Grid, DialogTitle, Button, ButtonGroup, TextField } from "@mui/material";

export default function StringAlterationDialog({ title, _string, open, onClose }) {
    const [string, setDialogString] = useState("");

    useEffect(() => {
        setDialogString(_string);
    }, [_string]);

    const handleClose = (save) => {
        onClose(save, string);
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