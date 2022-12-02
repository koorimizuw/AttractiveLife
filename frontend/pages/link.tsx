import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { TbPlugConnectedX, TbPlugConnected } from "react-icons/tb";
import { useApi } from "../hooks/useApi";
import Inputer from "../components/Inputer";

const IDInputer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  input {
    min-width: 50px;
    min-height: 50px;
    width: 5vw;
    height: 5vw;
    font-size: 3vw;
    & + input {
      margin-left: 1vw;
    }
  }
`;

const Connect = styled.div`
  margin: 0 auto;
  text-align: center;
  button {
    margin: 30px 0;
    width: 50%;
    height: 100px;
    font-size: 2em;
    @media (max-width: 768px) {
      font-size: 1.5em;
    }
  }
`;

const Disconnect = styled(Button)`
  margin-top: 10px;
  width: 100%;
  border-radius: 10px;
`;

const Status = styled(Box)`
  background: #555;
  text-align: center;
  font-size: 30px;
  border-radius: 10px;
  padding-top: 40px;
  margin-bottom: 100px;
`;

const Info = styled(Box)`
  background: #555;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 20px 40px;
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const Link: NextPage = () => {
  const api = useApi();

  const [linked, setLinked] = useState(false);
  const [detail, setDetail] = useState<Record<string, any>>({});
  const [sensorId, setSensorId] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleConnect = async () => {
    const id = sensorId.join("");
    if (!id) return;

    const { data } = await api.connect(id);
    if (data.error === 1) return;

    setLinked(true);
    setTimeout(async () => {
      const res = await api.status();
      if (res.data.error === 1) return;
      setDetail(res.data);
    }, 2000);
  };

  const handleDisconnect = async () => {
    const { data } = await api.disconnect();
    if (data.error === 1) return;

    setLinked(false);
  };

  useEffect(() => {
    api.status().then(({ data }) => {
      if (data.connectionState === "connected") setLinked(true);
      setDetail(data);
    });
  }, []);

  return (
    <>
      <Status style={{ color: linked ? "#00e676" : "#FFF" }}>
        {linked ? "Sensor connected!" : "Sensor not connected!"}
        <Box sx={{ fontSize: "100px" }}>
          {linked ? <TbPlugConnected /> : <TbPlugConnectedX />}
        </Box>
      </Status>
      {linked ? (
        <>
          <Info>
            <span>Device ID</span>
            <span>{detail.id}</span>
          </Info>
          <Info>
            <span>Connect Status</span>
            <span>{detail.connectionState}</span>
          </Info>
          <Info>
            <span>Fireware Version</span>
            <span>{detail.firmware_ver}</span>
          </Info>
          <Info>
            <span>HW</span>
            <span>{detail.hw}</span>
          </Info>
          <Disconnect
            onClick={handleDisconnect}
            variant="outlined"
            size="large"
            color="error"
          >
            Disconnect
          </Disconnect>
        </>
      ) : (
        <>
          <IDInputer>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Inputer
                  key={i}
                  value={sensorId[i]}
                  setValue={(v: string) => {
                    setSensorId(sensorId.map((id, j) => (j === i ? v : id)));
                    const next = v === "" ? i - 1 : i + 1;
                    const target = document.getElementsByClassName(
                      "inputer"
                    ) as HTMLCollectionOf<HTMLElement>;
                    if (target[next]) target[next].focus();
                  }}
                />
              ))}
          </IDInputer>
          <IDInputer>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Inputer
                  key={i + 4}
                  value={sensorId[i + 4]}
                  setValue={(v: string) => {
                    setSensorId(
                      sensorId.map((id, j) => (j === i + 4 ? v : id))
                    );
                    const next = v === "" ? i + 3 : i + 5;
                    const target = document.getElementsByClassName(
                      "inputer"
                    ) as HTMLCollectionOf<HTMLElement>;
                    if (target[next]) target[next].focus();
                  }}
                />
              ))}
          </IDInputer>
          <Connect>
            <Button onClick={handleConnect} size="large">
              Connect To Sensor
            </Button>
          </Connect>
        </>
      )}
    </>
  );
};

export default Link;
