import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { useNavigate, useParams } from '@tanstack/react-router';

import { CONF_FILE_NAME } from '@/hooks/useFileContent';
import { useFileNames } from '@/hooks/useFileNames';

export const FilesTabs = () => {
  const { files } = useFileNames();

  const navigate = useNavigate();
  const { filename } = useParams({ from: '/{-$filename}' });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Tabs
        value={filename || CONF_FILE_NAME}
        onChange={(_, value) => {
          void navigate({ to: `/${value}` });
        }}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 50,
          flex: 1,
        }}
      >
        {files.map(({ name, removable, editable, type }) => {
          let icon = undefined;

          if (type === 'conf') {
            icon = <SettingsOutlinedIcon fontSize="small" />;
          } else if (type === 'list') {
            icon = <DescriptionOutlinedIcon fontSize="small" />;
          } else if (type === 'log') {
            icon = <ArticleOutlinedIcon fontSize="small" />;
          }

          const labelNode = (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Box component="span">{name}</Box>

              {removable && (
                <IconButton
                  component="span"
                  role="button"
                  tabIndex={0}
                  size="small"
                  sx={{
                    ml: 0.5,
                    p: '2px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: add remove handler
                  }}
                >
                  <DeleteOutlineOutlinedIcon color="error" fontSize="inherit" />
                </IconButton>
              )}

              {!editable && (
                <IconButton
                  component="span"
                  role="button"
                  tabIndex={0}
                  size="small"
                  sx={{
                    ml: 0.5,
                    p: '2px',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: add remove handler
                  }}
                >
                  <CleaningServicesIcon color="warning" fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          );

          return (
            <Tab
              key={name}
              value={name}
              icon={icon}
              iconPosition="start"
              label={labelNode}
              sx={{
                minHeight: '50px',
                fontSize: 14,
                transition: 'color 0.1s ease-in-out',
                '&.Mui-selected': {
                  color: 'text.primary',
                },
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            />
          );
        })}
      </Tabs>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 1,
        }}
      >
        <IconButton
          size="small"
          color="primary"
          onClick={() => {
            // TODO: add create file handler
          }}
        >
          <AddOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
