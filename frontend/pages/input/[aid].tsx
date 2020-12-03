import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Container from "../../Components/Container/container";
import Header from "../../Components/Header/header";
import getConfig from "next/config";
import { Select, Button, Form } from "antd";
import Head from "next/head";
import SampleDataset from "../../Components/SampleDataset/sample";
import Spinner from "../../Components/Spinner/spinner";
import Progress from "../../Components/Steps/steps";
import nookies from "nookies";
import * as a from "axios";
const axios = a.default;
const { Option } = Select;
const { Dragger } = Upload;
const { publicRuntimeConfig } = getConfig();

const InputComponent: FC = () => {
  const upload = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        onProgress({ percent: (event.loaded / event.total) * 100 }, file);
      },
    };
    fmData.append("file", file);
    fmData.append("token", nookies.get(null).token);
    axios
      .post(`${publicRuntimeConfig.API_URL}/upload`, fmData, config)
      .then((res) => {
        onSuccess(res);
      })
      .catch((err) => {
        const error = new Error("Some error");
        onError({ event: error });
      });
  };
  const props = {
    name: "file",
    customRequest: upload,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        if (info.file.response.data === "File Not Allowed")
          message.error(`${info.file.name} File Not .csv`);
        else if (info.file.response.data === "Header Not Found")
          message.error(
            `${info.file.name} Required Headers not found in .csv file `
          );
        else {
          setStates(info.file.response.data.states);
          setUploaded(true);
          setStage(2);
          message.success(`${info.file.name} file uploaded successfully.`);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const [uploaded, setUploaded] = useState<Boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [stage, setStage] = useState<number>(1);
  const [states, setStates] = useState<Array<string>>([]);
  const router = useRouter();
  const { aid } = router.query;
  const onComplete = () => {
    setSpinning(true);
    router.push(`/result/${aid}?State=${selected}`);
  };
  return (
    <Spinner spinning={spinning}>
      <Container>
        <Head>
          <title>Outlier Detection</title>
        </Head>
        <Header heading={"Outlier Detection in COVID-19 Data"} showHome />
        <Progress stage={stage} />
        {!uploaded && (
          <div>
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
                Dataset must contain headings Date, State/UnionTerritory,
                Confirmed
              </p>
            </Dragger>
            <SampleDataset />
          </div>
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
            <Form onFinish={onComplete}>
              <Form.Item
                name="State"
                label="State"
                rules={[{ required: true }]}
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
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100vw",
                }}
              >
                <Form.Item>
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    style={{ width: "100px", marginTop: "30px" }}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        )}
      </Container>
    </Spinner>
  );
};

export default InputComponent;
