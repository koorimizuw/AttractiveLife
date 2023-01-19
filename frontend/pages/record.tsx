import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { useApi } from "../hooks/useApi";
import { Record } from "../types";

const MyBox = styled(Box)`
  background-color: #444;
  border-radius: 20px;
  padding: 20px 30px;
  max-height: calc(100vh - 100px);
`;

const DataBox = styled(Box)`
  margin-top: 50px;
  background-color: #222;
  padding: 20px;
  max-height: calc(100vh - 280px);
  overflow-y: scroll;
`;

const RecordPage: NextPage = () => {
  const api = useApi();
  const [status, setStatus] = useState<{
    isRecording: boolean;
    recordId?: number;
    records?: Record[];
  }>();
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await api.recordStatus();
    setStatus(res.data);
  };

  const start = async () => {
    const res = await api.start(name);
    if (res.data.error === 1) return;
    setStatus({ ...status, isRecording: true });
    await fetch();
  };

  const stop = async () => {
    const res = await api.stop();
    if (res.data.error === 1) return;
    setStatus({ ...status, isRecording: false });
    await fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {status && (
        <MyBox>
          {!status.isRecording ? (
            <>
              <Typography variant="h4" component="div">
                Start Record
              </Typography>
              <Box style={{ marginBottom: "20px" }}>
                <TextField
                  id="standard-basic"
                  label="Record Name"
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </Box>
              <Box style={{ textAlign: "right" }}>
                <Button variant="outlined" onClick={start}>
                  Start
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4" component="div">
                Record is started
              </Typography>
              <Box style={{ textAlign: "right" }}>
                <Button variant="outlined" onClick={fetch}>
                  Refresh
                </Button>
                <Button
                  variant="outlined"
                  onClick={stop}
                  style={{ marginLeft: "10px" }}
                  color="error"
                >
                  Stop
                </Button>
              </Box>
              <DataBox>
                {status.records && (
                  <>
                    <div>record id: {status.recordId}</div>
                    {status.records.map((r, i) => {
                      return (
                        <div key={i}>{`${new Date(r.time).toLocaleString(
                          "ja-JP"
                        )}: ${r.distance} mm`}</div>
                      );
                    })}
                  </>
                )}
              </DataBox>
            </>
          )}
        </MyBox>
      )}
    </>
  );
};
export default RecordPage;
