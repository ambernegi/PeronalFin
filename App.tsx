import React, { useState } from 'react';
import './App.css';
import StepperNav from './components/StepperNav';
import IncomeInput from './pages/IncomeInput';
import RiskQuiz from './pages/RiskQuiz';
import GoalSetting from './pages/GoalSetting';
import Dashboard from './pages/Dashboard';
import { Container, Box, Paper, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const steps = [
  'Income',
  'Risk Profile',
  'Goals',
  'Dashboard',
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#00bfae',
    },
    background: {
      default: '#f4f6fb',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial',
    fontWeightBold: 700,
  },
});

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [incomeData, setIncomeData] = useState<any>(null);
  const [riskAnswers, setRiskAnswers] = useState<string[] | null>(null);
  const [goals, setGoals] = useState<any>(null);

  const handleNext = (data?: any) => {
    if (activeStep === 0) setIncomeData(data);
    if (activeStep === 1) setRiskAnswers(data);
    if (activeStep === 2) setGoals(data);
    setActiveStep((prev) => prev + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1976d2 60%, #00bfae 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <Typography variant="h4" color="white" fontWeight={700} fontFamily="Montserrat">₹</Typography>
            </Box>
            <Typography variant="h5" fontWeight={700} color="primary" fontFamily="Montserrat">
              Prudentia
            </Typography>
          </Box>
          <StepperNav steps={steps} activeStep={activeStep} />
          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && <IncomeInput onNext={handleNext} />}
            {activeStep === 1 && <RiskQuiz onNext={handleNext} />}
            {activeStep === 2 && <GoalSetting onNext={handleNext} />}
            {activeStep === 3 && <Dashboard />}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
