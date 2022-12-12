import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {

  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
};

export default ReactQueryProvider;
