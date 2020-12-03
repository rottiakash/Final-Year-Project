import { Steps } from "antd";
import { FC } from "react";
const { Step } = Steps;

interface ProgressProps {
  stage: number;
}

const Progress: FC<ProgressProps> = ({ stage }) => (
  <Steps
    current={stage}
    style={{
      marginTop: "20px",
      marginBottom: "10px",
      display: "block",
      width: "100%",
      marginLeft: "30%",
    }}
  >
    <Step title="Select Algorithm" />
    <Step title="Upload Dataset" />
    <Step title="Select State" />
    <Step title="Result" />
  </Steps>
);

export default Progress;
