import React, { useState } from 'react';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, LinearProgress, Paper } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';

const firstQuestion = 'How would you describe your investment knowledge?';
const firstOptions = ['None', 'Basic', 'Moderate', 'Advanced'];

const branchQuestions: Record<string, string[]> = {
  None: [
    'Are you comfortable with basic savings accounts and FDs?',
    'Do you prefer guaranteed returns over higher but uncertain returns?',
    'How often do you review your finances?',
    'Would you like to learn more about investing?',
    'What is your main financial goal?',
    'How do you feel about taking any risk with your money?',
    'Do you have any debts or loans?'
  ],
  Basic: [
    'Have you invested in mutual funds or stocks before?',
    'How do you react to small losses in your investments?',
    'What is your preferred investment horizon?',
    'How much of your income do you save or invest monthly?',
    'Do you track your expenses and investments regularly?',
    'What is your main financial goal?',
    'Do you have any debts or loans?'
  ],
  Moderate: [
    'How do you diversify your investments?',
    'What percentage of your portfolio is in equities?',
    'How do you react to market volatility?',
    'What is your investment horizon?',
    'How much of your income do you invest monthly?',
    'Do you rebalance your portfolio regularly?',
    'Do you have any debts or loans?'
  ],
  Advanced: [
    'Do you invest in derivatives, international markets, or alternative assets?',
    'How do you manage risk in your portfolio?',
    'What is your annualized return expectation?',
    'How do you react to a 20% drawdown?',
    'What is your investment horizon?',
    'How often do you review and adjust your portfolio?',
    'Do you have any debts or loans?'
  ]
};

const branchOptions: Record<string, string[][]> = {
  None: [
    ['Yes', 'No'],
    ['Yes', 'No'],
    ['Rarely', 'Sometimes', 'Often'],
    ['Yes', 'No'],
    ['Wealth preservation', 'Growth', 'Income'],
    ['Not comfortable', 'Somewhat comfortable', 'Comfortable'],
    ['None', 'Low', 'Moderate', 'High']
  ],
  Basic: [
    ['Yes', 'No'],
    ['Sell immediately', 'Wait and watch', 'Buy more'],
    ['<1 year', '1-3 years', '3-5 years', '>5 years'],
    ['<10%', '10-20%', '20-40%', '>40%'],
    ['Yes', 'No'],
    ['Wealth preservation', 'Growth', 'Income'],
    ['None', 'Low', 'Moderate', 'High']
  ],
  Moderate: [
    ['Single asset', 'Multiple assets', 'Across asset classes'],
    ['<20%', '20-50%', '50-80%', '>80%'],
    ['Sell immediately', 'Wait and watch', 'Buy more', 'No reaction'],
    ['<1 year', '1-3 years', '3-5 years', '>5 years'],
    ['<10%', '10-20%', '20-40%', '>40%'],
    ['Yes', 'No'],
    ['None', 'Low', 'Moderate', 'High']
  ],
  Advanced: [
    ['Yes', 'No'],
    ['Hedging', 'Diversification', 'Stop-losses', 'All of these'],
    ['<8%', '8-12%', '12-20%', '>20%'],
    ['Sell immediately', 'Wait and watch', 'Buy more', 'No reaction'],
    ['<1 year', '1-3 years', '3-5 years', '>5 years'],
    ['Monthly', 'Quarterly', 'Annually', 'Never'],
    ['None', 'Low', 'Moderate', 'High']
  ]
};

interface RiskQuizProps {
  onNext: (answers: string[]) => void;
}

const RiskQuiz: React.FC<RiskQuizProps> = ({ onNext }) => {
  const [step, setStep] = useState(0); // 0 = first question, 1+ = branch
  const [firstAnswer, setFirstAnswer] = useState('');
  const [branchAnswers, setBranchAnswers] = useState<string[]>([]);
  const [error, setError] = useState('');

  const totalSteps = 1 + (firstAnswer ? branchQuestions[firstAnswer].length : 0);
  const progress = ((step + 1) / totalSteps) * 100;

  const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstAnswer(e.target.value);
    setError('');
    setBranchAnswers([]);
    setStep(0);
  };

  const handleBranchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = [...branchAnswers];
    updated[step - 1] = e.target.value;
    setBranchAnswers(updated);
    setError('');
  };

  const handleNext = () => {
    if (step === 0 && !firstAnswer) {
      setError('Please select an option to proceed.');
      return;
    }
    if (step > 0 && !branchAnswers[step - 1]) {
      setError('Please select an option to proceed.');
      return;
    }
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onNext([firstAnswer, ...branchAnswers]);
    }
  };

  // Responsive and fintech style
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mt: 2, background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <ShieldIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" fontWeight={600}>Risk Profile Quiz</Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, height: 8, borderRadius: 5 }} />
      {step === 0 ? (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>{firstQuestion}</Typography>
          <RadioGroup value={firstAnswer} onChange={handleFirstChange}>
            {firstOptions.map((opt) => (
              <FormControlLabel key={opt} value={opt} control={<Radio color="primary" />} label={opt} />
            ))}
          </RadioGroup>
        </>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
            {branchQuestions[firstAnswer][step - 1]}
          </Typography>
          <RadioGroup value={branchAnswers[step - 1] || ''} onChange={handleBranchChange}>
            {branchOptions[firstAnswer][step - 1].map((opt) => (
              <FormControlLabel key={opt} value={opt} control={<Radio color="primary" />} label={opt} />
            ))}
          </RadioGroup>
        </>
      )}
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3, borderRadius: 2, fontWeight: 600 }}
        onClick={handleNext}
      >
        {step === totalSteps - 1 ? 'Finish' : 'Next'}
      </Button>
    </Paper>
  );
};

export default RiskQuiz; 