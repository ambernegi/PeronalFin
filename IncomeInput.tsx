import React, { useState } from 'react';
import { Box, TextField, Button, Typography, InputAdornment, Grid, IconButton, Autocomplete } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const mockFunds = [
  'Axis Bluechip Fund',
  'HDFC Top 100 Fund',
  'SBI Small Cap Fund',
  'ICICI Prudential Equity & Debt Fund',
  'Nippon India Growth Fund',
  'UTI Nifty Index Fund',
  'Parag Parikh Flexi Cap Fund',
  'Mirae Asset Large Cap Fund',
  'Kotak Emerging Equity Fund',
  'Motilal Oswal Nasdaq 100 ETF',
];

interface InvestmentDetails {
  fd: string;
  cash: string;
  gold: string;
  realEstate: string;
  esop: string;
  rsu: string;
  mutualFunds: string;
  other: string;
}

interface SIP {
  fundName: string;
  amount: string;
}

interface IncomeInputProps {
  onNext: (data: any) => void;
}

const initialInvestments: InvestmentDetails = {
  fd: '',
  cash: '',
  gold: '',
  realEstate: '',
  esop: '',
  rsu: '',
  mutualFunds: '',
  other: '',
};

const IncomeInput: React.FC<IncomeInputProps> = ({ onNext }) => {
  const [salary, setSalary] = useState('');
  const [additionalIncome, setAdditionalIncome] = useState('');
  const [investments, setInvestments] = useState<InvestmentDetails>(initialInvestments);
  const [sips, setSips] = useState<SIP[]>([]);

  const handleInvestmentChange = (key: keyof InvestmentDetails, value: string) => {
    setInvestments((prev) => ({ ...prev, [key]: value }));
  };

  const handleSIPChange = (idx: number, field: keyof SIP, value: string) => {
    const updated = [...sips];
    updated[idx][field] = value;
    setSips(updated);
  };

  const handleAddSIP = () => {
    setSips([...sips, { fundName: '', amount: '' }]);
  };

  const handleRemoveSIP = (idx: number) => {
    setSips(sips.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ salary, additionalIncome, investments, sips });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>Enter Your Income & Investments</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label={<span>&#8377;</span>}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MonetizationOnIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Additional Income"
            value={additionalIncome}
            onChange={(e) => setAdditionalIncome(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SavingsIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Current SIPs</Typography>
        </Grid>
        {sips.map((sip, idx) => (
          <Grid item xs={12} key={idx}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={12} sm={7}>
                <Autocomplete
                  freeSolo
                  options={mockFunds}
                  value={sip.fundName}
                  onInputChange={(_, value) => handleSIPChange(idx, 'fundName', value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Fund Name" fullWidth margin="normal" />
                  )}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  label="Monthly Amount"
                  value={sip.amount}
                  onChange={(e) => handleSIPChange(idx, 'amount', e.target.value.replace(/[^\d.]/g, ''))}
                  fullWidth
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MonetizationOnIcon />
                      </InputAdornment>
                    ),
                    inputMode: 'numeric',
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton aria-label="remove sip" onClick={() => handleRemoveSIP(idx)} size="large">
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddSIP}
            sx={{ mt: 1, mb: 2, borderRadius: 2, fontWeight: 600 }}
            fullWidth
          >
            Add SIP
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Current Investments</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Fixed Deposits (FD)"
            value={investments.fd}
            onChange={(e) => handleInvestmentChange('fd', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Cash"
            value={investments.cash}
            onChange={(e) => handleInvestmentChange('cash', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyExchangeIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Gold"
            value={investments.gold}
            onChange={(e) => handleInvestmentChange('gold', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmojiEventsIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Real Estate"
            value={investments.realEstate}
            onChange={(e) => handleInvestmentChange('realEstate', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HomeWorkIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="ESOP"
            value={investments.esop}
            onChange={(e) => handleInvestmentChange('esop', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StarIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="RSU"
            value={investments.rsu}
            onChange={(e) => handleInvestmentChange('rsu', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ShowChartIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Mutual Funds"
            value={investments.mutualFunds}
            onChange={(e) => handleInvestmentChange('mutualFunds', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SavingsIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Other"
            value={investments.other}
            onChange={(e) => handleInvestmentChange('other', e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MoreHorizIcon />
                </InputAdornment>
              ),
              inputMode: 'numeric',
            }}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>Next</Button>
    </Box>
  );
};

export default IncomeInput; 