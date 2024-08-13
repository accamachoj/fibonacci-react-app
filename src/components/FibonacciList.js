// src/components/FibonacciList.js
import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Paper, Container, Typography } from '@mui/material';
import FibonacciContext from '../context/FibonacciContext';

const FibonacciList = () => {
  const { series } = useContext(FibonacciContext);

  return (
    <Container>
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h6">Historial serie Fibonacci</Typography>
        <List>
          {series.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Seeds: ${item.seeds}, Numbers: ${item.numbers}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default FibonacciList;