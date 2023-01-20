import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import type { NextPage } from "next";

const MyBox = styled(Box)`
  margin: 60px 0;
  a {
    justify-content: center;
  }
`;

const MyButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
  border-radius: 10px;
`;

const Home: NextPage = () => {
  return (
    <>
      <MyBox>
        <Typography
          variant="h2"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Welcome to
        </Typography>
        <Typography
          variant="h2"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Attractive Life
        </Typography>
      </MyBox>
      <MyButton href="/dashboard" variant="outlined" size="large">
        Dashboard
      </MyButton>
      <MyButton href="/link" variant="outlined" size="large">
        Link
      </MyButton>
    </>
  );
};

export default Home;
