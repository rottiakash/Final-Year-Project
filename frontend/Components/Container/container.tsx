import { FC } from "react";

interface ContainerProps {
  children: any;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {children}
    </div>
  );
};

export default Container;
