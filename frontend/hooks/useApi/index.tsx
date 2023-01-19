import axios from "./axios";

export const useApi = () => {
  const connect = async (id: string) => {
    return await axios.post("/link", { id });
  };
  const disconnect = async () => {
    return await axios.delete("/link");
  };
  const status = async () => {
    return await axios.get("/link");
  };
  const listRecord = async () => {
    return await axios.get("/record/list");
  };
  const lastData = async () => {
    return await axios.get("/data/last");
  };
  const getData = async (record_id: number) => {
    return await axios.get("/data", { params: { record_id } });
  };
  const start = async (name: string) => {
    return await axios.get("/record/start", { params: { name } });
  };
  const stop = async () => {
    return await axios.get("/record/stop");
  };
  const recordStatus = async () => {
    return await axios.get("/record/status");
  };
  return {
    connect,
    status,
    disconnect,
    listRecord,
    getData,
    lastData,
    start,
    stop,
    recordStatus,
  };
};
