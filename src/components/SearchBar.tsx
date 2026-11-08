import React from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { appleColors } from '../theme';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search movies, series, and more...',
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '680px',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: appleColors.canvas,
          border: appleColors.cardBorder,
          borderRadius: '9999px',
          height: '46px',
          px: 2,
          transition: 'all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          '&:focus-within': {
            borderColor: appleColors.primary,
            boxShadow: '0 0 0 3px rgba(0, 102, 204, 0.12)',
          },
        }}
      >
        <SearchIcon
          sx={{
            color: appleColors.inkMuted48,
            fontSize: 20,
            mr: 1.5,
            flexShrink: 0,
          }}
        />

        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputProps={{
            'aria-label': 'Search movies by title',
          }}
          sx={{
            flex: 1,
            color: appleColors.ink,
            fontSize: '16px',
            fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            '& input': {
              padding: '8px 0',
              '&::placeholder': {
                color: appleColors.inkMuted48,
                opacity: 0.8,
              },
            },
          }}
        />

        {value && (
          <IconButton
            size="small"
            onClick={onClear}
            aria-label="Clear search input"
            sx={{
              p: '4px',
              color: appleColors.inkMuted48,
              transition: 'transform 0.1s ease',
              '&:hover': {
                color: appleColors.ink,
              },
              '&:active': {
                transform: 'scale(0.9)',
              },
            }}
          >
            <CancelIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
