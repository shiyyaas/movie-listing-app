import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';
import { appleColors } from '../theme';

interface SkeletonLoaderProps {
  count?: number;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 8 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Box
            sx={{
              backgroundColor: appleColors.canvas,
              borderRadius: '18px',
              border: appleColors.cardBorder,
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Shimmering Poster Area */}
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                width: '100%',
                pt: '140%', // ~2:3 movie poster ratio
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                transform: 'none',
              }}
            />
            {/* Title Line */}
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                mt: 2,
                height: 24,
                width: '85%',
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              }}
            />
            {/* Subline: Year and Type */}
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  height: 18,
                  width: '35%',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{
                  height: 18,
                  width: '25%',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }}
              />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
