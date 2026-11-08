import React from 'react';
import { Box, Chip, TextField, MenuItem } from '@mui/material';
import { appleColors } from '../theme';

interface FilterRibbonProps {
  type: string;
  onTypeChange: (type: string) => void;
  year: string;
  onYearChange: (year: string) => void;
}

const TYPE_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Movies', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episodes', value: 'episode' },
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = ['All Years', ...Array.from({ length: 40 }, (_, i) => String(currentYear - i))];

export const FilterRibbon: React.FC<FilterRibbonProps> = ({
  type,
  onTypeChange,
  year,
  onYearChange,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: { xs: 1, sm: 1.5 },
        mt: 2.5,
        mb: 1,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        {TYPE_OPTIONS.map((opt) => {
          const isSelected = type === opt.value;
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              onClick={() => onTypeChange(opt.value)}
              variant={isSelected ? 'filled' : 'outlined'}
              sx={{
                fontSize: '13px',
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? '#ffffff' : appleColors.ink,
                backgroundColor: isSelected ? appleColors.primary : appleColors.canvas,
                borderColor: isSelected ? appleColors.primary : 'rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                px: 0.5,
                '&:hover': {
                  backgroundColor: isSelected ? appleColors.primaryFocus : appleColors.surfacePearl,
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Year Filter Dropdown */}
      <Box sx={{ minWidth: '120px' }}>
        <TextField
          select
          size="small"
          value={year || 'All Years'}
          onChange={(e) => {
            const val = e.target.value;
            onYearChange(val === 'All Years' ? '' : val);
          }}
          slotProps={{
            select: {
              displayEmpty: true,
              sx: {
                fontSize: '13px',
                fontFamily: 'inherit',
                borderRadius: '9999px',
                height: '32px',
                backgroundColor: appleColors.canvas,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: year ? appleColors.primary : 'rgba(0, 0, 0, 0.1)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: appleColors.primary,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: appleColors.primary,
                  borderWidth: '1.5px',
                },
                '& .MuiSelect-select': {
                  py: '4px',
                  px: '14px',
                  color: year ? appleColors.primary : appleColors.ink,
                  fontWeight: year ? 600 : 400,
                },
              },
            },
          }}
          sx={{
            m: 0,
          }}
        >
          {YEAR_OPTIONS.map((yr) => (
            <MenuItem
              key={yr}
              value={yr}
              sx={{
                fontSize: '13px',
                fontFamily: 'inherit',
              }}
            >
              {yr}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};
