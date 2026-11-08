import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { appleColors } from '../theme';

interface SubNavProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const SubNav: React.FC<SubNavProps> = ({
  title = 'Discover',
  subtitle,
  onBack,
  showBack = false,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(245, 245, 247, 0.82)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: `1px solid ${appleColors.hairline}`,
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '44px',
        zIndex: 1050,
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {showBack && (
            <Button
              onClick={onBack}
              startIcon={<ArrowBackIosNewIcon sx={{ fontSize: '13px !important' }} />}
              sx={{
                color: appleColors.primary,
                p: '4px 10px',
                minWidth: 'auto',
                fontSize: '14px',
                fontWeight: 400,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 102, 204, 0.06)',
                },
              }}
            >
              Movies
            </Button>
          )}
          <Typography
            sx={{
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
              fontSize: '21px',
              fontWeight: 600,
              letterSpacing: '0.231px',
              color: appleColors.ink,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: { xs: '200px', sm: '400px', md: '600px' },
            }}
          >
            {title}
          </Typography>
        </Box>

        {subtitle && (
          <Typography
            sx={{
              fontSize: '13px',
              color: appleColors.inkMuted48,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};
