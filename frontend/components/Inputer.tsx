import styled from "@emotion/styled";
import { FC, ReactNode, useState } from "react";

const Input = styled.input`
  border: 1px soild #fff;
  text-align: center;
`;

const Inputer: FC<{ value: string; setValue: (v: string) => void }> = ({
  value,
  setValue,
}) => {
  return (
    <Input
      className="inputer"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Inputer;
