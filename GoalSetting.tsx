import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, InputAdornment, MenuItem, Grid, IconButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const goalTypes = [
  { value: 'short', label: 'Short-term (<3 years)' },
  { value: 'mid', label: 'Mid-term (3-5 years)' },
  { value: 'long', label: 'Long-term (>5 years)' },
];

interface Goal {
  type: string;
  targetAmount: string;
  targetDate: Date | null;
}

interface GoalSettingProps {
  onNext: (goals: Goal[]) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ onNext }) => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const handleChange = (idx: number, field: keyof Goal, value: any) => {
    const updated = [...goals];
    updated[idx][field] = value;
    setGoals(updated);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { type: 'short', targetAmount: '', targetDate: null }]);
  };

  const handleRemoveGoal = (idx: number) => {
    setGoals(goals.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(goals);
  };

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mt: 2, background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)' }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>Set Your Goals (Optional)</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {goals.map((goal, idx) => (
              <Grid item xs={12} key={idx}>
                <Paper elevation={1} sx={{ p: 2, mb: 2, background: '#fff8e1', position: 'relative' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        select
                        label="Goal Type"
                        value={goal.type}
                        onChange={(e) => handleChange(idx, 'type', e.target.value)}
                        fullWidth
                        margin="normal"
                      >
                        {goalTypes.map((option) => (
                          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Target Amount"
                        value={goal.targetAmount}
                        onChange={(e) => handleChange(idx, 'targetAmount', e.target.value.replace(/[^\d.]/g, ''))}
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
                    <Grid item xs={12} sm={4}>
                      <DatePicker
                        label="Target Date"
                        value={goal.targetDate}
                        onChange={(date: Date | null) => handleChange(idx, 'targetDate', date)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            margin: 'normal',
                            InputProps: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <CalendarMonthIcon />
                                </InputAdornment>
                              ),
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton aria-label="remove goal" onClick={() => handleRemoveGoal(idx)} size="large">
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddGoal}
            sx={{ mt: 2, mb: 2, borderRadius: 2, fontWeight: 600 }}
            fullWidth
          >
            Add Goal
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, borderRadius: 2, fontWeight: 600 }} fullWidth>
            Next
          </Button>
        </Box>
      </LocalizationProvider>
    </Paper>
  );
};

export default GoalSetting; 