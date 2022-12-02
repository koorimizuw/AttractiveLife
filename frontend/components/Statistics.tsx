import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const MyCard = styled(Card)`
  background: #555;
  flex: 1;
  & + & {
    margin-left: 10px;
  }
`;

const Statistics: FC<{ title: string; value: string }> = ({ title, value }) => {
  return (
    <>
      <MyCard>
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </CardContent>
      </MyCard>
    </>
  );
};

export default Statistics;
