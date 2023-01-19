import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/useApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Record } from "../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBox = styled(Box)`
  background-color: #444;
  border-radius: 20px;
  padding: 20px 30px;
  max-height: calc(100vh - 100px);
  margin-bottom: 20px;
`;

const FlexBox = styled.div`
  display: flex;
  div {
    width: 50%;
  }
`;

const DataPage: NextPage = () => {
  const api = useApi();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [data, setData] = useState<Record[]>([]);

  const [min, setMin] = useState("100");
  const [max, setMax] = useState("1000");
  const [filtered, setFiltered] = useState<Record[]>([]);

  const distances = useMemo(() => data.map((r) => r.distance), [data]);

  const filterData = () => {
    if (isNaN(parseInt(min)) || isNaN(parseInt(max))) return;
    setFiltered(
      data.filter((r) => r.distance >= Number(min) && r.distance <= Number(max))
    );
  };

  const getData = async (id: number) => {
    const res = await api.getData(id);
    setData(res.data);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData(Number(id));
  }, [router.isReady, id]);

  useEffect(() => filterData(), [data]);

  const chartData = useMemo(() => {
    return {
      labels: filtered.map(
        (v) => new Date((new Date(v.time).getTime() / 1000 + 3600 * 9) * 1000)
      ),
      datasets: [
        {
          axis: "y",
          label: "Distance",
          data: filtered.map((v) => v.distance),
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(54, 162, 235)"],
          borderWidth: 1,
        },
      ],
    };
  }, [filtered]);

  return (
    <>
      {data.length > 0 && (
        <>
          <MyBox>
            <Typography variant="h4" component="div">
              Summary
            </Typography>
            <div>Row counts: {data.length}</div>
            <FlexBox>
              <div>Start time: {new Date(data[0].time).toLocaleString()}</div>
              <div>
                End time:{" "}
                {new Date(data[data.length - 1].time).toLocaleString()}
              </div>
            </FlexBox>
            <FlexBox>
              <div>Min distance: {Math.min(...distances)}</div>
              <div>Max distance: {Math.max(...distances)}</div>
            </FlexBox>
          </MyBox>
          <MyBox>
            <Typography variant="h4" component="div">
              Filtering
            </Typography>
            <FlexBox>
              <div style={{ alignSelf: "center" }}>
                Hide data less than this value:
              </div>
              <TextField
                id="standard-basic"
                label="Min"
                variant="standard"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
            </FlexBox>
            <FlexBox>
              <div style={{ alignSelf: "center" }}>
                Hide data rather than this value:
              </div>
              <TextField
                id="standard-basic"
                label="Max"
                variant="standard"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </FlexBox>
            <div style={{ textAlign: "right" }}>
              <Button variant="outlined" onClick={filterData}>
                Set
              </Button>
            </div>
          </MyBox>
          <Bar
            options={{
              indexAxis: "y",
            }}
            data={chartData}
          />
        </>
      )}
    </>
  );
};

export default DataPage;
