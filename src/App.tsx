import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootRoute, RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "@/routes/__root";

const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: () => (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RootLayout />
    </TooltipProvider>
  ),
});

const router = createRouter({
  routeTree: rootRoute,
  context: { queryClient },
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
