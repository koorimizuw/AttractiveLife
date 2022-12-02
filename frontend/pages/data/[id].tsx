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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataPage: NextPage = () => {
  const api = useApi();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [data, setData] = useState<any[]>([]);

  const getData = async (id: number) => {
    const res = await api.getData(id);
    setData(res.data.filter((v: any) => v.distance < 1000));
  };

  useEffect(() => {
    if (!router.isReady) return;
    getData(Number(id));
  }, [router.isReady, id]);

  const chartData = useMemo(() => {
    return {
      labels: data.map((v) => v.time),
      datasets: [
        {
          axis: "y",
          label: "Distance",
          data: data.map((v) => v.distance),
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(54, 162, 235)"],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <>
      {data.length > 0 && (
        <Bar
          options={{
            indexAxis: "y",
          }}
          data={chartData}
        />
      )}
    </>
  );
};

export default DataPage;
