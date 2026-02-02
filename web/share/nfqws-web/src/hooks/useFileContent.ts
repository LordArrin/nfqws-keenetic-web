import type { FilenamesResponse } from '@/api/schema';

import { useApi } from '@/utils/useApi';

export const CONF_FILE_NAME = 'nfqws2.conf';

export function useFileContent(filename: FilenamesResponse['files'][0]) {
  const api = useApi();
  const { isPending, data, error } = api.fileContent(filename);

  if (error) {
    throw error;
  }

  return {
    ...data,
    isPending,
  };
}
