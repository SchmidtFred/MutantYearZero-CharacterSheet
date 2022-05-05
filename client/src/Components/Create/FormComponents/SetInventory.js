import React from 'react';
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function SetInventory({ inventoryArray }) {
    const [
        weapons,
        armor,
        gear,
        tinyItems,
        setWeapons,
        setArmor, 
        setGear,
        setTinyItems
    ] = inventoryArray;

    return (
        <Grid container direction="column" alignItems="center" p={10} spacing={2} >
            <Grid item mb={2}>
                <Typography textAlign="center" variant="h4">Your Starting Inventory</Typography>
            </Grid>
            <Grid item textAlign="center" mb={2}>
                <Typography variant="body1">Refer to the core rule book for details on what starting gear looks like for your chosen role.</Typography>
            </Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={weapons}
                    onBlur={(e) => setWeapons(e.target.value)}
                    label="Weapons"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={armor}
                    onBlur={(e) => setArmor(e.target.value)}
                    label="Armor"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={gear}
                    onBlur={(e) => setGear(e.target.value)}
                    label="Gear"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={tinyItems}
                    onBlur={(e) => setTinyItems(e.target.value)}
                    label="Tiny Items"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />
        </Grid>
    )
}