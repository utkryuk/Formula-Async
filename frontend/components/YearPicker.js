import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';

export default function YearPicker({year, setYear, minDate}) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box m={2}>
        <DatePicker
          inputFormat="yyyy"
          views={['year']}
          label="Year"
          minDate={minDate}
          maxDate={new Date('2021-01-01')}
          value={year}
          onChange={setYear}
          renderInput={(params) => <TextField {...params} helperText={null}/>}
        />
      </Box>
    </LocalizationProvider>
  );
}
