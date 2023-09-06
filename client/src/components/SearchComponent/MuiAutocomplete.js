import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'];

const skillsOptions = skills.map((skill, index) => ({
  id: index + 1,
  label: skill,
}));

const MuiAutocomplete = () => {
  const [value, setValue] = useState(null);
  const [skill, setSkill] = useState(null);

  console.log(skill);

  return (
    <Stack spacing={2} width='250px'>
      <Autocomplete
        options={skills}
        renderInput={(params) => <TextField {...params} label='Skills' />}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
     
    </Stack>
  );
};

export default MuiAutocomplete;
