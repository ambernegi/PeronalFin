import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, Divider } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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

interface DashboardProps {
  salary?: string;
  sips?: SIP[];
  investments?: InvestmentDetails;
}

const investmentIcons = {
  fd: <AccountBalanceIcon color="primary" />,
  cash: <CurrencyExchangeIcon color="primary" />,
  gold: <EmojiEventsIcon color="primary" />,
  realEstate: <HomeWorkIcon color="primary" />,
  esop: <StarIcon color="primary" />,
  rsu: <ShowChartIcon color="primary" />,
  mutualFunds: <SavingsIcon color="primary" />,
  other: <MoreHorizIcon color="primary" />,
};

const Dashboard: React.FC<DashboardProps> = ({ salary, sips, investments }) => {
  // Salary/SIP graph data (mocked for now, can be extended with real history)
  const salaryNum = salary ? Number(salary) : 80000;
  const sipTotal = sips && sips.length > 0 ? sips.reduce((sum, s) => sum + Number(s.amount || 0), 0) : 5000;
  const salaryHistory = [
    { month: 'Jan', salary: salaryNum, sip: sipTotal },
    { month: 'Feb', salary: salaryNum, sip: sipTotal },
    { month: 'Mar', salary: salaryNum, sip: sipTotal },
    { month: 'Apr', salary: salaryNum, sip: sipTotal },
    { month: 'May', salary: salaryNum, sip: sipTotal },
    { month: 'Jun', salary: salaryNum, sip: sipTotal },
  ];

  // Investments summary
  const investmentList = investments
    ? [
        { label: 'Fixed Deposits (FD)', value: investments.fd, icon: investmentIcons.fd },
        { label: 'Cash', value: investments.cash, icon: investmentIcons.cash },
        { label: 'Gold', value: investments.gold, icon: investmentIcons.gold },
        { label: 'Real Estate', value: investments.realEstate, icon: investmentIcons.realEstate },
        { label: 'ESOP', value: investments.esop, icon: investmentIcons.esop },
        { label: 'RSU', value: investments.rsu, icon: investmentIcons.rsu },
        { label: 'Mutual Funds', value: investments.mutualFunds, icon: investmentIcons.mutualFunds },
        { label: 'Other', value: investments.other, icon: investmentIcons.other },
      ]
    : [
        { label: 'Fixed Deposits (FD)', value: 200000, icon: investmentIcons.fd },
        { label: 'Cash', value: 50000, icon: investmentIcons.cash },
        { label: 'Gold', value: 75000, icon: investmentIcons.gold },
        { label: 'Real Estate', value: 500000, icon: investmentIcons.realEstate },
        { label: 'ESOP', value: 120000, icon: investmentIcons.esop },
        { label: 'RSU', value: 90000, icon: investmentIcons.rsu },
        { label: 'Mutual Funds', value: 180000, icon: investmentIcons.mutualFunds },
        { label: 'Other', value: 20000, icon: investmentIcons.other },
      ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Salary & SIP Graph */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>Salary & SIP Trend</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salaryHistory} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="salary" stroke="#1976d2" strokeWidth={2} name="Salary" />
                <Line type="monotone" dataKey="sip" stroke="#00bfae" strokeWidth={2} name="SIP" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {/* Investments Summary */}
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>Current Investments</Typography>
            <Grid container spacing={1}>
              {investmentList.map((inv) => (
                <Grid item xs={6} key={inv.label}>
                  <Card sx={{ display: 'flex', alignItems: 'center', p: 1, boxShadow: 'none', background: '#f4f6fb' }}>
                    <Box sx={{ mr: 1 }}>{inv.icon}</Box>
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="body2" fontWeight={500}>{inv.label}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">₹{Number(inv.value || 0).toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        {/* SIPs Summary */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>Current SIPs</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {(sips && sips.length > 0
                ? sips
                : [
                    { fundName: 'Axis Bluechip Fund', amount: 3000 },
                    { fundName: 'Parag Parikh Flexi Cap Fund', amount: 2000 },
                    { fundName: 'UTI Nifty Index Fund', amount: 1000 },
                  ]
              ).map((sip, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ background: '#e3f2fd', boxShadow: 'none' }}>
                    <CardContent>
                      <Typography variant="body1" fontWeight={600}>{sip.fundName}</Typography>
                      <Typography variant="subtitle2" color="text.secondary">Monthly: ₹{Number(sip.amount || 0).toLocaleString()}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 