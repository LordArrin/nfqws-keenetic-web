import { LogoutOutlined } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link, Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Link
            href="https://github.com/Anonym-tsk/nfqws-keenetic"
            target="_blank"
            underline="none"
            color="text.secondary"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.85,
              fontSize: 15,
              lineHeight: 1,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <GitHubIcon sx={{ fontSize: '1.2em', alignSelf: 'center' }} />
            nfqws
          </Link>

          <Link
            href="https://github.com/nfqws/nfqws2-keenetic"
            target="_blank"
            underline="none"
            color="text.secondary"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.85,
              fontSize: 15,
              lineHeight: 1,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <GitHubIcon sx={{ fontSize: '1.2em', alignSelf: 'center' }} />
            nfqws2
          </Link>

          <Link
            href="https://github.com/nfqws/nfqws-keenetic-web"
            target="_blank"
            underline="none"
            color="text.secondary"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.85,
              fontSize: 15,
              lineHeight: 1,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <GitHubIcon sx={{ fontSize: '1.2em', alignSelf: 'center' }} />
            web
          </Link>

          <Link
            component="button"
            color="text.secondary"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.85,
              fontSize: 15,
              lineHeight: 1,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <LogoutOutlined sx={{ fontSize: '1.2em', alignSelf: 'center' }} />
          </Link>
        </Stack>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: 1, fontSize: 15 }}
          >
            v2.10.9
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
