import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';

export default function YearPicker({year, setYear, minDate, maxDate}) {
  
  if(maxDate == null){
    maxDate = new Date('2021-01-01');
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <DatePicker
          inputFormat="yyyy"
          views={['year']}
          label="Year"
          minDate={minDate}
          maxDate={maxDate}
          value={year}
          onChange={setYear}
          renderInput={(params) => <TextField {...params} helperText={null}/>}
        />
      </Box>
    </LocalizationProvider>
  );
}
