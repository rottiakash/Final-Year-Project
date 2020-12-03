import { FC, useEffect, useState } from "react";
import Head from "next/head";
import AlgoGrid from "../Components/AlgoGrid/algogrid";
import getConfig from "next/config";
import nookies from "nookies";
import * as a from "axios";
import Header from "../Components/Header/header";
import Container from "../Components/Container/container";
import Spinner from "../Components/Spinner/spinner";
import Progress from "../Components/Steps/steps";
const axois = a.default;

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

interface Algorithm {
  Name: string;
  algorithm: number;
}

interface IndexProps {
  data: Array<Algorithm>;
}

const Index: FC<IndexProps> = ({ data }) => {
  const [spinning, setSpinning] = useState<boolean>(false);
  useEffect(() => {
    const cookies = nookies.get(null);
    if (!cookies.token) {
      nookies.set(null, "token", makeid(20), { maxAge: 30 * 24 * 60 * 60 });
    }
  }, []);
  return (
    <Spinner spinning={spinning}>
      <Container>
        <Head>
          <title>Outlier Detection</title>
        </Head>
        <Header heading={"Outlier Detection in COVID-19 Data"} />
        <Progress stage={0} />
        <div></div>
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
