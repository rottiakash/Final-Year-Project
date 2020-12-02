import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Container from "../../Components/Container/container";
import Header from "../../Components/Header/header";
import getConfig from "next/config";
import { Select } from "antd";
import { Button } from "antd";
import Head from "next/head";

const { Option } = Select;
const { Dragger } = Upload;
const { publicRuntimeConfig } = getConfig();

const InputComponent: FC = () => {
  const props = {
    name: "file",
    action: `${publicRuntimeConfig.API_URL}/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        setStates(info.file.response.states);
        setUploaded(true);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        console.log(info);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const [uploaded, setUploaded] = useState<Boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [states, setStates] = useState<Array<string>>([]);
  const router = useRouter();
  const { aid } = router.query;
  return (
    <Container>
      <Head>
        <title>Outlier Detection</title>
      </Head>
      <Header heading={"Outlier Detection for COVID-19 Data"} showHome />
      {!uploaded && (
        <Dragger {...props} style={{ marginTop: "30px" }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Upload the .csv file of dataset here.
          </p>
          <p className="ant-upload-hint">
            Dataset must contain headings Date, State/UnionTerritory, Confirmed
          </p>
        </Dragger>
      )}
      {uploaded && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "50px",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <Select
            onChange={(value) => setSelected(value)}
            placeholder="Select a State/Union Territory"
            style={{ width: "100vw" }}
          >
            {states.map((state) => (
              <Option value={state} key={state}>
                {state}
              </Option>
            ))}
          </Select>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100vw",
            }}
          >
            <Button
              type="primary"
              shape="round"
              style={{ width: "100px", marginTop: "30px" }}
              onClick={async (e) => {
                e.preventDefault();
                router.push(`/result/${aid}?State=${selected}`);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default InputComponent;
