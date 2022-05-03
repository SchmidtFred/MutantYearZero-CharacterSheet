import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import StringEdit from "../../StringEdit";

//this component is specifically for working within the character details panel
export default function DetailsPanelCard({title, _string, setter}) {
    const [open, setOpen] = useState(false);
    const [string, setString] = useState("");

    useEffect(() => {
        setString(_string);
    }, [_string]);

    return (
        <Grid
        item
        onClick={() =>
            StringEdit.handlers.handleOpen(open, setOpen)
        }
        sx={[{ "&:hover": { cursor: "pointer" } }]}
    >
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body1">{string}</Typography>
            </CardContent>
        </Card>
        <StringEdit.render.StringDialog
            title={title}
            _string={string}
            open={open}
            onClose={StringEdit.handlers.handleClose}
            openSetter={setOpen}
            stringSetter={setter} />
    </Grid>
    )
}