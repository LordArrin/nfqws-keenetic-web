import { Alert } from '@mui/material';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { Layout } from '@/components/Layout';

import type { RouterContext } from '@/utils/createRouterProviderContext.tsx';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
  notFoundComponent: () => {
    return <Alert severity="error">404: Page not found.</Alert>;
  },
});

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
