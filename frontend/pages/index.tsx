import { FC } from "react";
import Head from "next/head";
import AlgoGrid from "../Components/AlgoGrid/algogrid";
import getConfig from "next/config";
import * as a from "axios";
import Header from "../Components/Header/header";
import Container from "../Components/Container/container";
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
    <Container>
      <Head>
        <title>Outlier Detection</title>
      </Head>
      <Header heading={"Outlier Detection for COVID-19 Data"} />
      <AlgoGrid data={data} />
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { publicRuntimeConfig } = getConfig();
  const res = await axois.get(`${publicRuntimeConfig.API_URL}/getAlgos`);
  const data: Array<Algorithm> = res.data.result;
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Index;
