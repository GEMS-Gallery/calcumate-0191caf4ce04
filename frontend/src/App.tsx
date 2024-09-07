import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { backend } from 'declarations/backend';

const CalculatorPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 300,
}));

const CalculatorButton = styled(Button)(({ theme }) => ({
  fontSize: '1.25rem',
  margin: theme.spacing(0.5),
}));

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = async (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      setLoading(true);
      const result = await calculateResult(firstOperand, inputValue, operator);
      setLoading(false);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculateResult = async (firstOperand: number, secondOperand: number, operator: string): Promise<number> => {
    switch (operator) {
      case '+':
        return await backend.add(firstOperand, secondOperand);
      case '-':
        return await backend.subtract(firstOperand, secondOperand);
      case '*':
        return await backend.multiply(firstOperand, secondOperand);
      case '/':
        const result = await backend.divide(firstOperand, secondOperand);
        if (result === null) {
          throw new Error('Division by zero');
        }
        return result;
      default:
        return secondOperand;
    }
  };

  return (
    <CalculatorPaper elevation={3}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            value={display}
            InputProps={{
              readOnly: true,
              style: { fontSize: '1.5rem', textAlign: 'right' }
            }}
          />
        </Grid>
        {loading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container>
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <Grid item xs={3} key={btn}>
                <CalculatorButton
                  fullWidth
                  variant="contained"
                  color={['/', '*', '-', '+', '='].includes(btn) ? 'secondary' : 'primary'}
                  onClick={() => {
                    if (btn === '=') {
                      performOperation('=');
                    } else if (['+', '-', '*', '/'].includes(btn)) {
                      performOperation(btn);
                    } else if (btn === '.') {
                      inputDecimal();
                    } else {
                      inputDigit(btn);
                    }
                  }}
                >
                  {btn}
                </CalculatorButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CalculatorButton fullWidth variant="contained" color="secondary" onClick={clear}>
            Clear
          </CalculatorButton>
        </Grid>
      </Grid>
    </CalculatorPaper>
  );
};

export default App;