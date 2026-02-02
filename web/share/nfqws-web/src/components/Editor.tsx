import { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import ReactCodeMirror from '@uiw/react-codemirror';

import { nfqwsConf, nfqwsLog } from '@/utils/nfqwsCodeMirrorLang';

interface EditorProps {
  value: string;
  type: 'conf' | 'log' | 'list';
}

const isAuthenticated = true; // TODO:

export const Editor = ({ value, type }: EditorProps) => {
  const { palette } = useTheme();

  const extensions = useMemo(() => {
    if (type === 'conf') {
      return [nfqwsConf()];
    }

    if (type === 'log') {
      return [nfqwsLog()];
    }

    return [];
  }, [type]);

  return (
    <Box
      flex={1}
      sx={{
        position: 'relative',
        '& .cm-theme': {
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
        '& .cm-editor': {
          height: '100%',
          background: (theme) => theme.palette.background.default,
          outline: 'none',
        },
        '& .cm-gutters': {
          background: (theme) => theme.palette.background.paper,
        },
        '& .cm-scroller': { overflow: 'auto' },
        '& .cm-lineNumbers .cm-gutterElement': {
          paddingLeft: '13px !important',
        },
      }}
    >
      <ReactCodeMirror
        value={value}
        theme={palette.mode === 'light' ? vscodeLight : vscodeDark}
        autoFocus={true}
        readOnly={!isAuthenticated}
        lang="shell"
        style={{ height: '100%', fontSize: 13 }}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          history: true,
        }}
        extensions={extensions}
      />
    </Box>
  );
};
