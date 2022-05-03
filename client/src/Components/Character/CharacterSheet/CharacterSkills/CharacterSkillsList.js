import React, { useEffect, useState } from 'react';
import { Stack, Divider, Typography, Box } from "@mui/material";
import CharacterSkill from './CharacterSkill';

export default function CharacterSkillsList({ skills }) {
    return (
        <Box maxWidth="50%">
            <Typography variant="h5" textAlign="center">Skills</Typography>
            <Stack spacing={1} divider={<Divider variant="middle" flexItem />}>
                {skills?.map(skill => <CharacterSkill key={skill.id} skill={skill} />)}
            </Stack>
        </Box>
    )
}