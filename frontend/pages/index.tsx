import { FC } from "react";
import Card from "../Components/Card/card";
import * as a from "axios";
const axois = a.default;

interface Algorithm {
  Name: string;
  algorithm: number;
}

interface IndexProps {
  data: Array<Algorithm>;
}

const Index: FC<IndexProps> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          fontSize: "2rem",
          marginTop: "30px",
        }}
      >
        Outlier Detection for COVID-19 Data
      </span>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        {data.map((algo) => (
          <Card name={algo.Name} key={algo.algorithm} algorithm={algo.algorithm}/>
        ))}
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await axois.get("http://localhost:5000/getAlgos");
  const data: Array<Algorithm> = res.data.result;
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Index;
