import { FC, useState } from "react";
import Head from "next/head";
import AlgoGrid from "../Components/AlgoGrid/algogrid";
import getConfig from "next/config";

import * as a from "axios";
import Header from "../Components/Header/header";
import Container from "../Components/Container/container";
import Spinner from "../Components/Spinner/spinner";
const axois = a.default;

interface Algorithm {
  Name: string;
  algorithm: number;
}

interface IndexProps {
  data: Array<Algorithm>;
}

const Index: FC<IndexProps> = ({ data }) => {
  const [spinning, setSpinning] = useState<boolean>(false);
  return (
    <Spinner spinning={spinning}>
      <Container>
        <Head>
          <title>Outlier Detection</title>
        </Head>
        <Header heading={"Outlier Detection in COVID-19 Data"} />
        <AlgoGrid data={data} setSpinning={setSpinning} />
      </Container>
    </Spinner>
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
