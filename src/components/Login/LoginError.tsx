import { PropsWithChildren } from "react";

const LoginError = (props: PropsWithChildren) => {
  return <div style={{ color: 'red' }}>{props.children}</div>;
};

export default LoginError;
