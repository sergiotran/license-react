import React from "react";

function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return (props: T) => {

    return <Component {...props} />
  }
}

export default withAuth;
