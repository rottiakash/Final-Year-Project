import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FC } from "react";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface SpinnerProps {
  children: any;
  spinning: boolean;
}

const Spinner: FC<SpinnerProps> = ({ children, spinning }) => {
  return (
    <Spin
      tip="Loading..."
      indicator={antIcon}
      size={"large"}
      spinning={spinning}
    >
      {children}
    </Spin>
  );
};

export default Spinner;
