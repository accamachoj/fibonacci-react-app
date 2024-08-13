// src/components/FibonacciForm.js
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import FibonacciContext from '../context/FibonacciContext';

const FibonacciForm = () => {
  const { generateSeries, getSeriesHistory, error } = useContext(FibonacciContext);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [inputTime, setInputTime] = useState('');
  const [timeOption, setTimeOption] = useState('current'); // 'current' or 'input'
  const [generatedSeries, setGeneratedSeries] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerateSeries = async () => {
    let hours, minutes, seconds;

    if (timeOption === 'current') {
      const [currentHours, currentMinutes, currentSeconds] = currentTime.split(':').map(Number);
      hours = currentHours;
      minutes = currentMinutes;
      seconds = currentSeconds;
    } else {
      const timeParts = inputTime.split(':');
      if (timeParts.length !== 3) {
        alert('Formato de tiempo invalido. Por favor usa HH:MM:SS');
        return;
      }
      [hours, minutes, seconds] = timeParts.map(Number);
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0 || seconds > 59) {
        alert('Formato de tiempo invalido. Por favor usa HH:MM:SS');
        return;
      }
    }

    try {
      const response = await generateSeries(hours, minutes, seconds);
      setGeneratedSeries(response);
    } catch (err) {
      console.error('Error generando la serie: ', err);
    }
  };

  return (
    <Container>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h6">Hora actual: {currentTime}</Typography>
        <FormControl component="fieldset" style={{ marginTop: 20 }}>
          <FormLabel component="legend">Generar serie usando:</FormLabel>
          <RadioGroup row aria-label="time-option" name="time-option" value={timeOption} onChange={(e) => setTimeOption(e.target.value)}>
            <FormControlLabel value="current" control={<Radio />} label="Hora actual" />
            <FormControlLabel value="input" control={<Radio />} label="Ingresar hora manual" />
          </RadioGroup>
        </FormControl>
        {timeOption === 'input' && (
          <TextField
            label="Formato de hora (HH:MM:SS)"
            type="text"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            fullWidth
            placeholder="00:00:00"
            style={{ marginTop: 20 }}
          />
        )}
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleGenerateSeries} fullWidth>
              Generar serie Fibonacci
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={getSeriesHistory} fullWidth>
              Mostrar historial de la serie
            </Button>
          </Grid>
        </Grid>
        {error && <Typography color="error" style={{ marginTop: 20 }}>{error}</Typography>}
        {generatedSeries && (
          <Typography variant="body1" style={{ marginTop: 20 }}>
            Seeds: {generatedSeries.seeds}, Numbers: {generatedSeries.numbers}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default FibonacciForm;