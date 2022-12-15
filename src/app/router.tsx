import Loading from "@/common/components/loading";
import { Suspense } from "react";

import routes from '~react-pages';
import { useRoutes } from "react-router-dom";

export const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      {useRoutes(routes)}
    </Suspense>
  );
};

export default Router;
