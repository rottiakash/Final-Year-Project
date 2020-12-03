import { Table } from "antd";
import React, { FC } from "react";

const dataSource = [
  {
    Date: "30/01/20",
    State: "Karnataka",
    Confirmed: "1",
  },
  {
    Date: "16/09/20",
    State: "Karnataka",
    Confirmed: "475265",
  },
  {
    Date: "18/09/20",
    State: "Karnataka",
    Confirmed: "494356",
  },
  {
    Date: "29/09/20",
    State: "Karnataka",
    Confirmed: "582458",
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "Date",
    key: "Date",
  },
  {
    title: "State/UnionTerritory",
    dataIndex: "State",
    key: "State/UnionTerritory",
  },
  {
    title: "Confirmed",
    dataIndex: "Confirmed",
    key: "Confirmed",
  },
];

const SampleDataset: FC = () => (
  <div
    style={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      marginTop: "30px",
      alignItems: "center",
    }}
  >
    <span style={{ fontSize: "2rem" }}>Sample Dataset</span>
    <Table
      dataSource={dataSource}
      columns={columns}
      bordered
      pagination={false}
      style={{ marginTop: "30px" }}
    />
  </div>
);

export default SampleDataset;
