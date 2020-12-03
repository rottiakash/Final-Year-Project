import { FC } from "react";
import Card from "../Card/card";

interface Algorithm {
  Name: string;
  algorithm: number;
}

interface AlgoGridProps {
  data: Array<Algorithm>;
  setSpinning: any;
}

const AlgoGrid: FC<AlgoGridProps> = ({ data, setSpinning }) => (
  <section
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1rem",
    }}
  >
    {data.map((algo) => (
      <Card
        name={algo.Name}
        key={algo.algorithm}
        algorithm={algo.algorithm}
        setSpinning={setSpinning}
      />
    ))}
  </section>
);

export default AlgoGrid;
