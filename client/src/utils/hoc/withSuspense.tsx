import React, { Suspense } from "react";
import { Loader } from "shared";

const withSuspense = (WrappedComponent: React.FC) => {
  return (
    <Suspense fallback={<Loader />}>
      <WrappedComponent />
    </Suspense>
  );
};

export default withSuspense;
