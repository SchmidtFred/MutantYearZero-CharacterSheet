import React from 'react';
import { Divider, Grid, TextField, Typography, FormControlLabel, Checkbox } from "@mui/material";

export default function SetRelationshipsAndDreams({ personalArray }) {
    const [
        {
            pcRel1: pcRel1,
            pcRel2: pcRel2,
            pcRel3: pcRel3,
            pcRel4: pcRel4,
            buddyBools: buddyBools,
            setPcRel1: setPcRel1,
            setPcRel2: setPcRel2,
            setPcRel3: setPcRel3,
            setPcRel4: setPcRel4,
            setBuddyBools: setBuddyBools
        },
        {
            protect: protect,
            hate: hate,
            dream: dream,
            setProtect: setProtect,
            setHate: setHate,
            setDream: setDream
        }
    ] = personalArray;

    const handleBuddyChange = (event) => {
		const copy = { ...buddyBools };
		copy[event.target.name] = event.target.checked;
		setBuddyBools(copy);
	};

    return (
        <Grid container direction="column" alignItems="center" p={10} spacing={2}>
            <Grid item mb={2}>
            <Typography textAlign="center" variant="h4">Your Relationships and Dreams</Typography>
            </Grid>

            <Grid item textAlign="center" mb={2}>
                <Typography variant="body1">Refer to the core rule book for suggestions</Typography>
            </Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={pcRel1}
                    onBlur={(e) => setPcRel1(e.target.value)}
                    label="PC Relationship 1"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
                <FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy1 ? buddyBools.buddy1 : false}
								onChange={handleBuddyChange}
								name="buddy1"
							/>
						}
						label="Buddy"
					/>
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={pcRel2}
                    onBlur={(e) => setPcRel2(e.target.value)}
                    label="PC Relationship 2"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
                <FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy2 ? buddyBools.buddy2 : false}
								onChange={handleBuddyChange}
								name="buddy2"
							/>
						}
						label="Buddy"
					/>
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={pcRel3}
                    onBlur={(e) => setPcRel3(e.target.value)}
                    label="PC Relationship 3"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
                <FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy3 ? buddyBools.buddy3 : false}
								onChange={handleBuddyChange}
								name="buddy3"
							/>
						}
						label="Buddy"
					/>
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={pcRel4}
                    onBlur={(e) => setPcRel4(e.target.value)}
                    label="PC Relationship 4"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
                <FormControlLabel
						control={
							<Checkbox
								checked={buddyBools.buddy4 ? buddyBools.buddy4 : false}
								onChange={handleBuddyChange}
								name="buddy4"
							/>
						}
						label="Buddy"
					/>
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={protect}
                    onBlur={(e) => setProtect(e.target.value)}
                    label="I want to Protect:"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={hate}
                    onBlur={(e) => setHate(e.target.value)}
                    label="I Hate"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>

            <Divider variant="middle" flexItem />

            <Grid item container justifyContent="space-between" alignItems="center" wrap='nowrap' mb={2}>
                <TextField
                    defaultValue={dream}
                    onBlur={(e) => setDream(e.target.value)}
                    label="My Big Dream"
                    sx={{width: "100%"}}
                    multiline
                    rows={2}
                />
			</Grid>
        </Grid>
    )
}