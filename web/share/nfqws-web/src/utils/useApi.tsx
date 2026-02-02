import { useMemo } from 'react';
import { requestFn } from '@openapi-qraft/react';
import type { OperationError } from '@openapi-qraft/tanstack-query-react-types';
import { useQueryClient, type UseQueryResult } from '@tanstack/react-query';

import { baseUrl } from '@/api/baseUrl';
import { createAPIClient } from '@/api/create-api-client';
import type {
  ApiError,
  FileContentResponse,
  FilenamesResponse,
} from '@/api/schema';

export const useApi = () => {
  const queryClient = useQueryClient();

  const apiClient = useMemo(
    () =>
      createAPIClient({
        baseUrl,
        queryClient,
        requestFn,
      }),
    [],
  );

  return useMemo(
    () => ({
      listFiles: () =>
        apiClient.indexPhp.postIndexCmd.useQuery({
          body: { cmd: 'filenames' },
        }) as UseQueryResult<FilenamesResponse, OperationError<ApiError>>,
      fileContent: (filename: FilenamesResponse['files'][0]) =>
        apiClient.indexPhp.postIndexCmd.useQuery({
          body: { cmd: 'filecontent', filename },
        }) as UseQueryResult<FileContentResponse, OperationError<ApiError>>,
      filesave: (filename: string, content: string) =>
        apiClient.indexPhp.postIndexCmd({
          body: { cmd: 'filesave', filename, content },
        }),
      action: (cmd: 'reload' | 'restart' | 'stop' | 'start' | 'upgrade') =>
        apiClient.indexPhp.postIndexCmd({ body: { cmd } }),
      logout: () =>
        apiClient.indexPhp.postIndexCmd({ body: { cmd: 'logout' } }),
    }),
    [apiClient],
  );
};
