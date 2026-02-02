import { createFileRoute } from '@tanstack/react-router';

import { Editor } from '@/components/Editor';

import { CONF_FILE_NAME, useFileContent } from '@/hooks/useFileContent';

export const Route = createFileRoute('/{-$filename}')({
  component: RouteComponent,
});

function RouteComponent() {
  const { filename } = Route.useParams();
  const { content } = useFileContent(filename || CONF_FILE_NAME);

  return (
    <Editor
      value={content ?? ''}
      type={
        filename.endsWith('.conf')
          ? 'conf'
          : filename.endsWith('.log')
            ? 'log'
            : 'list'
      }
    />
  );
}
