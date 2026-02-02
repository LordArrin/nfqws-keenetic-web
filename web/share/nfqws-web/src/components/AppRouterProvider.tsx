import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, type RegisteredRouter } from '@tanstack/react-router';
import { useState } from 'react';

import { createRouterProviderContext } from '@/utils/createRouterProviderContext';

export function AppRouterProvider({ router }: { router: RegisteredRouter }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={createRouterProviderContext(queryClient)}
      />
    </QueryClientProvider>
  );
}
