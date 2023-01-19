import { FC, ReactNode, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

const RootContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 20px 10px;
`;

const pages = ["dashboard", "link", "record"];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
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
                AttractiveLife
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link key={page} href={`/${page}`}>
                    <Button sx={{ my: 2, color: "white", display: "block" }}>
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <RootContainer>{children}</RootContainer>
      </ThemeProvider>
    </>
  );
};

export default Layout;
