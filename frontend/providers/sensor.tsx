import { createContext, FC, ReactNode, useEffect, useState } from "react";

/*
interface SensorState {
  sensor: Obniz | undefined;
  connect: (id: string) => void;
}

export const sensorContext = createContext<SensorState>({} as SensorState);

const SensorProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [sensor, setSensor] = useState<Obniz>();

  const connect = (id: string) => {
    const obniz = new M5Stack(id);

    var hcsr04: HCSR04 | undefined;
    obniz.onconnect = async () => {
      hcsr04 = obniz.wired("HC-SR04", { gnd: 0, echo: 1, trigger: 2, vcc: 3 });
    };

    obniz.onloop = async function () {
      if (!hcsr04) return;

      const distance = await hcsr04.measureWait();
      console.log("distance:" + distance);

      await obniz.wait(1000);
    };
    obniz.onclose = async function () {
      hcsr04 = undefined;
    };

    setSensor(obniz);
  };

  return (
    <>
      <sensorContext.Provider value={{ sensor, connect }}>
        {children}
      </sensorContext.Provider>
    </>
  );
};

export default SensorProvider;
*/
