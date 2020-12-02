import { FC, useContext } from "react";
import getConfig from "next/config";
import Header from "../../Components/Header/header";
import * as a from "axios";
import Container from "../../Components/Container/container";

const axios = a.default;
interface ResultProps {
  output: string;
}

const Result: FC<ResultProps> = ({ output }) => {
  return (
    <Container>
      <Header heading={"Outlier Detection for COVID-19 Data"} showHome />
      <iframe srcDoc={output} style={{ width: "100%", height: "100%" }} />
    </Container>
  );
};

export default Result;

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const { aid, State } = context.query;
  const res = await axios.post(publicRuntimeConfig.API_URL, {
    State: State,
    Algorithm: aid,
  });
  const output = res.data;

  return {
    props: { output }, // will be passed to the page component as props
  };
}
