import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { appleColors } from '../theme';

export const GlobalNav: React.FC = () => {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: appleColors.surfaceBlack,
        color: appleColors.bodyOnDark,
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          px: { xs: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MovieFilterIcon sx={{ fontSize: 18, color: '#ffffff' }} />
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '-0.12px',
              color: '#ffffff',
            }}
          >
            Cinema
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            component="span"
            sx={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '-0.12px',
              display: { xs: 'none', sm: 'inline-block' },
            }}
          >
            OMDb Library
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '-0.12px',
            }}
          >
            v1.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
