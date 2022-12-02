import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";
import Statistics from "../components/Statistics";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const StatisticsArea = styled.div`
  display: flex;
`;

const Dashboard: NextPage = () => {
  const api = useApi();
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const [lastData, setLastData] = useState<any>();

  useEffect(() => {
    api.listRecord().then(({ data }) => {
      setList(data);
    });
    api.lastData().then(({ data }) => {
      setLastData(data);
    });
  }, []);

  const handleSelect = (id: number) => {
    router.push(`data/${id}`);
  };
  return (
    <>
      {list.length && (
        <>
          <Typography
            variant="h4"
            component="div"
            style={{ marginBottom: "10px" }}
          >
            Statistics
          </Typography>
          {lastData && (
            <StatisticsArea>
              <Statistics title="RecordCount" value={list.length.toString()} />
              <Statistics
                title="LastData"
                value={new Date(lastData.time).toLocaleString()}
              />
            </StatisticsArea>
          )}
          <Typography
            variant="h4"
            component="div"
            style={{ marginTop: "20px", marginBottom: "10px" }}
          >
            Data
          </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((l, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {l.id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {l.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button onClick={() => handleSelect(l.id)}>Select</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Dashboard;
